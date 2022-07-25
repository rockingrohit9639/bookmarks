import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Singup from './Pages/Signup/Singup';
import Home from './Pages/Home/Home';
import AddNewBookmark from './Pages/AddNewBookmark/AddNewBookmark';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/add-new-bookmark" element={<AddNewBookmark />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
