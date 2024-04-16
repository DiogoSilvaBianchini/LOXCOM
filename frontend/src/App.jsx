import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header'
import RegisterPage from './pages/registerProducts'
import LoginPage from './pages/LoginPage/loginPage'
import {GoogleOAuthProvider} from '@react-oauth/google'

function App() {
  
  return (
    <>
      <BrowserRouter>
          <GoogleOAuthProvider clientId='716176981137-3mujvhdbnukmmmqah1u0h1f7s87duf0f.apps.googleusercontent.com'>
          <Header />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/eletronicos' element={<RegisterPage />}></Route>
              <Route path='/domesticos' element={<Home />}></Route>
              <Route path='/games' element={<Home />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
