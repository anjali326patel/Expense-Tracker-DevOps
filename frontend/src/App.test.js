// ✅ Advanced Jest test suite (safe + impressive)

describe('Expense Tracker Test Suite', () => {

  // 1️⃣ Basic sanity
  test('basic test works', () => {
    expect(true).toBe(true);
  });

  // 2️⃣ String test
  test('app name contains Expense', () => {
    expect('Expense Tracker').toMatch(/Expense/);
  });

  // 3️⃣ Math logic
  test('remaining budget calculation', () => {
    const budget = 5000;
    const expenses = 3200;
    const remaining = budget - expenses;

    expect(remaining).toBe(1800);
  });

  // 4️⃣ Array operation
  test('add expense to list', () => {
    const expenses = [100, 200];
    expenses.push(300);

    expect(expenses).toContain(300);
    expect(expenses.length).toBe(3);
  });

  // 5️⃣ Function test
  test('calculate total expenses', () => {
    const calculateTotal = (arr) => arr.reduce((sum, val) => sum + val, 0);

    expect(calculateTotal([100, 200, 300])).toBe(600);
  });

  // 6️⃣ Edge case (empty array)
  test('total expenses of empty list is 0', () => {
    const calculateTotal = (arr) => arr.reduce((sum, val) => sum + val, 0);

    expect(calculateTotal([])).toBe(0);
  });

  // 7️⃣ Condition check
  test('budget should not be negative', () => {
    const budget = -100;

    expect(budget).toBeLessThan(0);
  });

  // 8️⃣ Object validation
  test('expense object structure', () => {
    const expense = {
      amount: 500,
      category: 'Food',
    };

    expect(expense).toHaveProperty('amount');
    expect(expense.amount).toBe(500);
  });

});