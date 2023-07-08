import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Todos from './Todos/Todos';
import Signin from './Session/Signin';
import Signup from './Session/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/todos/duetoday' element={<Todos sectionId='1' section='Due Today'/>} />
        <Route path='/todos/overdue' element={<Todos sectionId='2' section='Overdue'/>} />
        <Route path='/todos/duelater' element={<Todos sectionId='3' section='Due Later'/>} />
        <Route path='/todos/completed' element={<Todos sectionId='4' section='Completed'/>} />
      </Routes>
    </Router>
  );
}

export default App
