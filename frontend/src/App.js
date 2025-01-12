import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  console.log(message);

  useEffect(() => {
    fetch('http://localhost:5000/users/json')
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">React + Express</h1>
      <p className="mt-4 text-lg">{message ? message[1].name : "Gest"}</p>
    </div>
  );
}

export default App;
