import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTrustScoreAndVerdict,
  computeExtractedFieldDiffs,
  generateVerhoeffChecksumDigit,
  maskSensitiveIdentifier,
  redactSensitiveText,
  validateBankStatementArithmetic,
  validateMarksCardRules,
  validatePANCard,
  verifyAadhaarVerhoeff,
} from './forensicsEngine';

test('Verhoeff checksum validates authentic 12-digit Aadhaar and rejects tampered digit', () => {
  const base11 = '48291037562';
  const checkDigit = generateVerhoeffChecksumDigit(base11);
  const validAadhaar = `${base11}${checkDigit}`;

  const validRes = verifyAadhaarVerhoeff(validAadhaar);
  assert.equal(validRes.valid, true);

  // Flip the last digit to simulate tampering
  const tamperedDigit = (checkDigit + 1) % 10;
  const tamperedAadhaar = `${base11}${tamperedDigit}`;
  const invalidRes = verifyAadhaarVerhoeff(tamperedAadhaar);
  assert.equal(invalidRes.valid, false);
  assert.match(invalidRes.reason, /Verhoeff mathematical checksum failed/);

  // Leading 0 or 1 is rejected per UIDAI rules
  const leadingOne = verifyAadhaarVerhoeff('123456789012');
  assert.equal(leadingOne.valid, false);
});

test('PAN validator verifies AAAAA9999A structure and 4th-character entity code', () => {
  const validIndividual = validatePANCard('ABCPS1234K');
  assert.equal(validIndividual.valid, true);
  assert.equal(validIndividual.entityType, 'Individual / Person');

  const invalidEntity = validatePANCard('ABCZS1234K');
  assert.equal(invalidEntity.valid, false);
  assert.match(invalidEntity.reason, /Invalid 4th-character entity code/);

  const badFormat = validatePANCard('AB1234567K');
  assert.equal(badFormat.valid, false);
});

test('Bank statement arithmetic validator catches tampered row balances and duplicate UTRs', () => {
  const cleanLedger = validateBankStatementArithmetic(50000, [
    {
      rowNumber: 1,
      date: '2026-10-01',
      description: 'NEFT Salary Credit',
      reference: 'UTR9001',
      debit: 0,
      credit: 85000,
      balance: 135000,
    },
    {
      rowNumber: 2,
      date: '2026-10-05',
      description: 'Rent Transfer',
      reference: 'UTR9002',
      debit: 25000,
      credit: 0,
      balance: 110000,
    },
  ]);
  assert.equal(cleanLedger.valid, true);
  assert.equal(cleanLedger.discrepancies.length, 0);

  // Tampered balance on row 1 (inflated by 1,00,000)
  const tamperedLedger = validateBankStatementArithmetic(50000, [
    {
      rowNumber: 1,
      date: '2026-10-01',
      description: 'NEFT Salary Credit',
      reference: 'UTR9001',
      debit: 0,
      credit: 185000,
      balance: 135000,
    },
  ]);
  assert.equal(tamperedLedger.valid, false);
  assert.equal(tamperedLedger.discrepancies.length, 1);
});

test('Marks card validator catches subject sum and percentage mismatches', () => {
  const validMarks = validateMarksCardRules(
    [
      {
        subjectCode: 'CS301',
        subjectName: 'Algorithms',
        internalMarks: 28,
        externalMarks: 62,
        totalMarks: 90,
        maxMarks: 100,
      },
      {
        subjectCode: 'CS302',
        subjectName: 'Operating Systems',
        internalMarks: 25,
        externalMarks: 55,
        totalMarks: 80,
        maxMarks: 100,
      },
    ],
    170,
    200,
    85.0
  );
  assert.equal(validMarks.valid, true);

  // Pasted digit in CS302 totalMarks (changed 80 to 98 without updating grand total)
  const tamperedMarks = validateMarksCardRules(
    [
      {
        subjectCode: 'CS301',
        subjectName: 'Algorithms',
        internalMarks: 28,
        externalMarks: 62,
        totalMarks: 90,
        maxMarks: 100,
      },
      {
        subjectCode: 'CS302',
        subjectName: 'Operating Systems',
        internalMarks: 25,
        externalMarks: 55,
        totalMarks: 98,
        maxMarks: 100,
      },
    ],
    170,
    200,
    85.0
  );
  assert.equal(tamperedMarks.valid, false);
  assert.equal(tamperedMarks.errors.length, 2);
});

test('Scoring engine enforces FR-S3 hard-fail cap at <= 40 and handles Inconclusive state', () => {
  const highModules = [
    {
      id: 'pixel_forensics' as const,
      name: 'Pixel Forensics',
      weight: 30,
      applicable: true,
      score: 92,
      confidence: 'High' as const,
      summary: 'Clean',
      details: [],
    },
    {
      id: 'field_validation' as const,
      name: 'Field Validation',
      weight: 25,
      applicable: true,
      score: 95,
      confidence: 'High' as const,
      summary: 'Valid',
      details: [],
    },
  ];

  const authenticResult = calculateTrustScoreAndVerdict({ modules: highModules });
  assert.equal(authenticResult.verdict, 'Looks authentic');
  assert.ok(authenticResult.score >= 90);

  // Trigger FR-S3 hard-fail (QR data mismatch)
  const hardFailResult = calculateTrustScoreAndVerdict({
    modules: highModules,
    hardFails: { qrDataMismatch: true },
  });
  assert.ok(hardFailResult.score <= 40);
  assert.equal(hardFailResult.verdict, 'Likely tampered');
  assert.equal(hardFailResult.hardFailTriggered, true);

  // Trigger FR-T3 low quality screenshot inconclusive
  const inconclusiveResult = calculateTrustScoreAndVerdict({
    modules: highModules,
    lowQualityInput: {
      isHeavyCompressionOrScreenshot: true,
      reason: 'WhatsApp re-saved screenshot with heavy sub-sampling',
    },
  });
  assert.equal(inconclusiveResult.verdict, 'Inconclusive');
  assert.equal(inconclusiveResult.confidence, 'Low');
});

test('Redaction & masking hides Aadhaar, PAN, and phone numbers and diffs fields', () => {
  assert.equal(maskSensitiveIdentifier('4829 1037 5624', 'aadhaar'), 'XXXX-XXXX-5624');
  assert.equal(maskSensitiveIdentifier('ABCPS1234K', 'pan'), 'XXXXX1234K');

  const sampleText =
    'Applicant Aadhaar 4829 1037 5624 and PAN ABCPS1234K with mobile +91 9876543210.';
  const redacted = redactSensitiveText(sampleText);
  assert.equal(redacted.redactionCount, 3);
  assert.ok(!redacted.redactedText.includes('4829 1037'));
  assert.ok(!redacted.redactedText.includes('ABCPS1234K'));

  const diffs = computeExtractedFieldDiffs(
    [
      {
        id: '1',
        name: 'Grand Total',
        valueRaw: '412 / 500',
        valueMasked: '412 / 500',
        sensitive: false,
        valid: true,
        ruleChecked: 'Sum check',
      },
    ],
    [
      {
        id: '1',
        name: 'Grand Total',
        valueRaw: '472 / 500',
        valueMasked: '472 / 500',
        sensitive: false,
        valid: false,
        ruleChecked: 'Sum check',
      },
    ]
  );
  assert.equal(diffs[0].changed, true);
});
