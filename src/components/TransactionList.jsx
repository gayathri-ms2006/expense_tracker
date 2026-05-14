export default function TransactionList({ transactions = [] }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">History</h3>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-400">No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="p-2 my-1 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center"
            >
              <span>
                {tx.description} <span className="text-sm text-gray-500">({tx.category})</span>
              </span>
              <span
                className={tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}
              >
                ₹{tx.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}