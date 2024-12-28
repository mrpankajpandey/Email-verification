import React from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/pages/NotFound'
import Dashboard from './components/Dashboard';
import  { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route 
          path='/dashboard'
          element={<ProtectedRoute>

            <Dashboard/>
          </ProtectedRoute>}
        />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
      <Toaster/>
    
        </>
  )
}

export default App