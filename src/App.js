
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import SendMail from './components/sendMail/SendMail.js';
import ResetPassword from './components/feature/ResetPassword.js';
import ProductPage from './pages/ProductPage.js';
import Cart from './components/Cart/Cart.js';
import Shopcontextprovider from './components/context/Shopcontext.js';

function App() {
  return (
    <div className="App">
      <Shopcontextprovider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/sendMail' element={<SendMail />} />
            <Route path='/resetpass' element={<ResetPassword />} />
            <Route path='/product' element={<ProductPage />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </Shopcontextprovider>
    </div>
  );
}

export default App;

