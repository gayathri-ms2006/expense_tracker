import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function CategoryFilter({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'transactions'), snapshot => {
      const cats = new Set();
      snapshot.docs.forEach(doc => {
        const { category } = doc.data();
        if (category) cats.add(category);
      });
      setCategories([...cats]);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <select onChange={e => onSelectCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
