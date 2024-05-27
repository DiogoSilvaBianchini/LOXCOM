import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import LoginPage from './pages/LoginPage/loginPage.jsx'
import SandBox from './pages/sandBox/SandBox.jsx'
import PerfilPage from './pages/perfilPage/perfilPage.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import ProductPage from './pages/ProductPage/ProductPage.jsx'
import ProdutctPaymith from './pages/ProdutctPaymith/ProductPaymith.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
          <GoogleOAuthProvider clientId='716176981137-3mujvhdbnukmmmqah1u0h1f7s87duf0f.apps.googleusercontent.com'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/login' element={<LoginPage/>}></Route>
              <Route path='/perfil' element={<PerfilPage/>}></Route>
              <Route path='/admin/:productId/:quant' element={<ProdutctPaymith />}></Route>
              <Route path='/product/:productId' element={<ProductPage />}></Route>
              <Route path='/sanbox' element={<SandBox />}></Route>
            </Routes>
          </GoogleOAuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App
