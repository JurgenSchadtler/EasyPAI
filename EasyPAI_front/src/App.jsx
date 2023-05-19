import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transfer from './pages/transfer'
import Expenses from './pages/expenses'
import Login from './pages/login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/expenses' element={<Expenses />} />
        
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
