export function formatCurrency(amount: number, region: string = 'France'): string {
  const formatter = new Intl.NumberFormat(region === 'US' ? 'en-US' : 'fr-FR', {
    style: 'currency',
    currency: region === 'US' ? 'USD' : 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
}