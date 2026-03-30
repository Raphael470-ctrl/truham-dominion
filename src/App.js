import { BrowserRouter, Link,Route, Routes } from 'react-router-dom';
import './App.css';
import Addproducts from './components/Addproducts';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Signin from './components/Signin';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <h1 className='title'>P-Automotives: Buy OR Rent</h1>
      </header>
      <section className='column'>
        <div className='col-md-2'>
         <nav className='nav-link bg-dark'>
          <Link to='/' className='navlinks text-light'>Home</Link>
          <Link to='/SignUp' className='navlinks text-light'>SignUp</Link>
          <Link to='/SignIn' className='navlinks text-light'>SignIn</Link>
          <Link to='/AddProducts' className='navlinks text-light'>AddProduct</Link>
        </nav>
        </div>
      </section>
      <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/addproducts' element={<Addproducts/>}/>
      <Route path='/' element={<Getproduct/>}/>
      <Route path='/makepayment' element={<Makepayment/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
