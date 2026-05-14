import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import CategoryFilter from './components/CategoryFilter';
import DarkToggle from './components/DarkToggle';
import { useState } from 'react';
import { logout } from './firebase';

function MainApp({ user }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter((tx) => tx.category === selectedCategory)
    : transactions;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Welcome, {user.displayName}</h2>
        </div>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <DarkToggle />
      <Header />
      <Balance transactions={transactions} />
      <IncomeExpense transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} userId={user?.uid} />


      <CategoryFilter onSelectCategory={setSelectedCategory} />
      <ExpenseChart transactions={transactions} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}

export default MainApp;
