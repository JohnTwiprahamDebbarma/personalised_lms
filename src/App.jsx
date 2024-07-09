import './App.css'

import { Route, Routes } from 'react-router-dom'

// import Aboutus from './pages/Aboutus'
import Contact from './pages/ImpContacts.jsx'
import Home from './pages/Home.jsx'
import Notfound from './pages/Notfound.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/contact us' element={<Contact />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App
