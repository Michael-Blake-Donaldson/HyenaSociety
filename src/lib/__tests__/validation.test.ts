import { validateEmail, validatePassword } from '@/lib/validation';

describe('Email Validation', () => {
  it('accepts valid email formats', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('test.user+tag@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('user@')).toBe(false);
    expect(validateEmail('@example.com')).toBe(false);
  });

  it('handles edge cases', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('   ')).toBe(false);
  });
});

describe('Password Validation', () => {
  it('accepts passwords with 8+ characters', () => {
    expect(validatePassword('ValidPass123')).toBe(true);
    expect(validatePassword('LongPasswordWith123')).toBe(true);
  });

  it('rejects short passwords', () => {
    expect(validatePassword('short')).toBe(false);
    expect(validatePassword('1234567')).toBe(false);
  });

  it('enforces minimum length', () => {
    expect(validatePassword('12345678')).toBe(true);
    expect(validatePassword('1234567')).toBe(false);
  });
});
