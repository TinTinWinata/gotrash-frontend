export function convertToPascalCase(text: string, join = ''): string {
  const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');
  const words = cleanedText.split(/\s+/);
  const pascalCaseText = words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(join);
  return pascalCaseText;
}

export function formatNumber(value: number): string {
  if (!value) {
    return '';
  }
  const options = {minimumFractionDigits: 0, maximumFractionDigits: 0};
  const formattedNumber = value.toLocaleString('en-US', options);
  return formattedNumber;
}

export function convertPhoneNumber(phoneNumber: string): string {
  phoneNumber = phoneNumber.replace(/\D/g, '');
  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.substring(1);
  }
  const countryCode = '+62';
  const firstPart = phoneNumber.substring(0, 3);
  const secondPart = phoneNumber.substring(3, 7);
  const thirdPart = phoneNumber.substring(7);

  return `${countryCode} ${firstPart} ${secondPart} ${thirdPart}`;
}
