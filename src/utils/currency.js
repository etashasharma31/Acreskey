/** Indian Rupee symbol — use Unicode escape to avoid file-encoding issues on Windows. */
export const RUPEE = '\u20B9';

/** Fix mojibake and ensure prices display with the correct rupee symbol. */
export function normalizeRupeeText(text) {
  if (text == null) return '';
  return String(text)
    .replace(/\u00e2\u201a\u00b9/g, RUPEE)
    .replace(/\u00e2\u0082\u00b9/g, RUPEE);
}

export function rupee(amount, spaced = true) {
  return `${spaced ? `${RUPEE} ` : RUPEE}${amount}`;
}
