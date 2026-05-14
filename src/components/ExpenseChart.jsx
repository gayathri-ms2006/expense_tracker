import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa46be'];

function ExpenseChart() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn("User not logged in");
        return;
      }

      setUserId(user.uid);

      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const categoryTotals = {};

        snapshot.docs.forEach((doc) => {
          const { amount, category } = doc.data();
          const parsedAmount = parseFloat(amount);

          if (!isNaN(parsedAmount) && category && parsedAmount < 0) {
            categoryTotals[category] =
              (categoryTotals[category] || 0) + Math.abs(parsedAmount);
          }
        });

        const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
          name,
          value,
        }));

        console.log("✅ Chart Data:", chartData);
        setData(chartData);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2">Expense Breakdown</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No expense data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;
