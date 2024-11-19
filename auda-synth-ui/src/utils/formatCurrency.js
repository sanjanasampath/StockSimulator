export function euroCurrencyStd(number) {
	return new Intl.NumberFormat('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(number);
}