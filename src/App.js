import logo from './logo.svg';
import React, { useContext } from 'react';

//components 
import './App.css';
import NavBar from './components/NavBar';
import DASHBOARD from './components/DASHBOARD';
import AllUser from './components/AllUsers';
import AddUser from './components/AddUser';

//router
import { BrowserRouter ,Routes ,Route } from 'react-router-dom' ;
import EditUser from './components/EditUser';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<DASHBOARD />} />
        <Route path='/all' element={<AllUser />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/edit/:id' element={<EditUser/>} />     
        </Routes>
    </BrowserRouter>
  );
}

export default App;
