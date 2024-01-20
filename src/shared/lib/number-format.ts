// Description: This function is used to format the number from string to number
export function numberFormat(num: string): number {
  const parsedNumber = parseInt(num.replace(/[^0-9]/g, ''));
  return isNaN(parsedNumber) ? 0 : parsedNumber;
}
