import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import Mensaje from './components/Mensaje';

function App() {
  const [mensaje, setMessage] = useState('');

  return (
    <div className="App">
      <Login setMessage={setMessage} />
      <Mensaje mensaje={mensaje} />
    </div>
  );
}

export default App;
