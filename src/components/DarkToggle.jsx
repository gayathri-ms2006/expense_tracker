import { useState, useEffect } from 'react';

function DarkToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <div className="text-right mb-4">
      <button
        onClick={() => setDark(!dark)}
        className="bg-gray-800 text-white dark:bg-yellow-400 dark:text-black px-4 py-2 rounded shadow transition"
      >
        {dark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default DarkToggle;
