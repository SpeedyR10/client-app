import './App.css';
import SearchAppBar from './components/AppBar';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import OrderForm from './components/OrderForm';
import Account from './components/Account';

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <SearchAppBar/>
          <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/products/:id" element={<Products/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/cart" element={<OrderForm/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/account" element={<Account/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
