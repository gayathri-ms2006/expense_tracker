export default function IncomeExpense({ transactions = [] }) {
  const income = transactions
    .filter(tx => parseFloat(tx.amount) > 0)
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  const expense = transactions
    .filter(tx => parseFloat(tx.amount) < 0)
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    .toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold text-center">Income & Expenses</h3>
      <div className="flex justify-around mt-4">
        <div className="text-green-600 dark:text-green-400 font-bold">+₹{income}</div>
        <div className="text-red-600 dark:text-red-400 font-bold">-₹{Math.abs(expense)}</div>
      </div>
    </div>
  );
}
