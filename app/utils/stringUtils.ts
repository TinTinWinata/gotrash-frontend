export function convertToPascalCase(text: string, join = ''): string {
  const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
  const words = cleanedText.split(/\s+/);
  const pascalCaseText = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(join);
  return pascalCaseText;
}

export function formatNumber(value: number): string {
  const options = {minimumFractionDigits: 0, maximumFractionDigits: 0};
  const formattedNumber = value.toLocaleString('en-US', options);
  return formattedNumber;
}
