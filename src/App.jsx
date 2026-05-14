import { useEffect, useState } from 'react';
import Login from './components/Login';
import MainApp from './MainApp';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to auth state changes (e.g., after reload or persistent login)
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <MainApp user={user} />
      )}
    </div>
  );
}

export default App;