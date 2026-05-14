import { useState } from 'react';
import { addTransactionToFirestore } from '../firebase'; // make sure the path is correct

export default function TransactionForm({ addTransaction, userId }) {
  console.log("User ID passed to form:", userId); // ✅ Debug line

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // income or expense
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      setError('Please fill all fields');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      setError('Amount must be a valid number');
      return;
    }

    const signedAmount = type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

    const newTransaction = {
      id: Date.now(),
      description,
      amount: signedAmount,
      category,
      type
    };

    setLoading(true);
    setError('');

    try {
      addTransaction(newTransaction); // Add to app state
      await addTransactionToFirestore(userId, newTransaction); // Add to Firestore

      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
      setType('expense');
    } catch (err) {
      console.error("Error saving transaction:", err);
      setError('Failed to save transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 my-4">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="col-span-1 p-2 rounded border"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="col-span-1 p-2 rounded border"
      />
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="col-span-1 p-2 rounded border"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="col-span-1 p-2 rounded border"
      />
      <button
        type="submit"
        className="col-span-1 bg-blue-500 text-white rounded p-2 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>

      {error && (
        <p className="col-span-5 text-red-500 text-sm mt-1">{error}</p>
      )}
    </form>
  );
}
