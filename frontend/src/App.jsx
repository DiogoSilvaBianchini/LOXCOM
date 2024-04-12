import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/eletronicos' element={<Home />}></Route>
          <Route path='/domesticos' element={<Home />}></Route>
          <Route path='/games' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
