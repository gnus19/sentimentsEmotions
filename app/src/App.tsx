import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Navigate to="/auth"></Navigate>
  );
}

export default App;
