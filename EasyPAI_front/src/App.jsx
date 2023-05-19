import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Transfer from './pages/transfer'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transfer' element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
