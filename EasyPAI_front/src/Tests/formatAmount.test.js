const formatAmount = (amount) => {
    // Convert the amount to a formatted string with comma for thousands separator
    const formattedAmount = amount
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedAmount;
};

test('formatAmount gives the correct format', () => {
    expect(formatAmount(1527.57)).toBe("1,527.57");
});

test('formatAmount gives the correct format', () => {
    expect(formatAmount(1200527)).toBe("1,200,527.00");
});

test('formatAmount gives the correct format', () => {
    expect(formatAmount(5)).toBe("5.00");
});