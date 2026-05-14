export default function Balance({ transactions = [] }) {
  const total = transactions.reduce(
    (sum, tx) => sum + parseFloat(tx.amount || 0),
    0
  ).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold text-center">Balance</h2>
      <p className="text-2xl text-center font-bold text-green-600 dark:text-green-400">
        ₹{total}
      </p>
    </div>
  );
}
