const postRequest = (balance, amount) => {
    const current_amount = parseInt(amount.replaceAll(',', ''))
    if (current_amount < 100 || current_amount > 7000) return false;
    else if (balance >= current_amount) {
        return true;
    } else {
        return false
    }
}

test('postRequest handles exceeptions correctly', () => {
    expect(postRequest(5000, "5,500.00")).toBe(false);
});

test('postRequest handles exceeptions correctly', () => {
    expect(postRequest(22000, "7001.00")).toBe(false);
});

test('postRequest handles exceeptions correctly', () => {
    expect(postRequest(22000, "99.00")).toBe(false);
});

test('postRequest handles exceeptions correctly', () => {
    expect(postRequest(22000, "550.00")).toBe(true);
});

test('postRequest handles exceeptions correctly', () => {
    expect(postRequest(22000, "1800.00")).toBe(true);
});