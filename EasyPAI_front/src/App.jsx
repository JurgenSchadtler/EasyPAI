import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transfer from './pages/transfer'
import Expenses from './pages/expenses'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/expenses' element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
