import { formatCurrency } from '@/lib/format';

describe('Currency Formatting', () => {
  it('formats whole dollars correctly', () => {
    expect(formatCurrency(100)).toBe('$100');
    expect(formatCurrency(0)).toBe('$0');
  });

  it('rounds decimals to nearest dollar', () => {
    expect(formatCurrency(99.99)).toBe('$100');
    expect(formatCurrency(99.49)).toBe('$99');
    expect(formatCurrency(100.5)).toBe('$101');
  });

  it('handles large amounts', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235');
    expect(formatCurrency(9999999.99)).toBe('$10,000,000');
  });

  it('handles edge cases', () => {
    expect(formatCurrency(0.01)).toBe('$0');
    expect(formatCurrency(1000)).toBe('$1,000');
    expect(formatCurrency(0.5)).toBe('$1');
  });
});
