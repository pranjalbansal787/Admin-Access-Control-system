// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AccessControlPage from './components/AccessControlPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrator Access Control System</h1>
      </header>
      <div className="container mt-4">
        <AccessControlPage />
      </div>
    </div>
  );
}

export default App;
