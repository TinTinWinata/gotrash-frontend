export function convertToPascalCase(text: string): string {
  const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
  const words = cleanedText.split(/\s+/);
  const pascalCaseText = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
  return pascalCaseText;
}
