import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Todos from './Todos/Todos';
// import Signin from './Session/Signin';
// import Signup from './Session/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/signup" element={<Signup/>} /> */}
        {/* <Route path="/signin" element={<Signin/>} /> */}
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </Router>
  );
}

export default App
