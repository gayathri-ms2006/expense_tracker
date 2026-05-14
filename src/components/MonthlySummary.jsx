import React from 'react';

const MonthlySummary = ({ transactions }) => {
  const summary = transactions.reduce((acc, t) => {
    const date = new Date(t.date);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) acc[key] = 0;
    acc[key] += Number(t.amount);
    return acc;
  }, {});

  return (
    <div className="monthly-summary">
      <h3>Monthly Summary</h3>
      <ul>
        {Object.entries(summary).map(([month, total]) => (
          <li key={month}>{month}: ₹{total.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlySummary;