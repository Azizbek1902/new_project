import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './view/login';
import Category from './view/category'
import User from './view/user';
import Testlar from './view/question';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/category' element={<Category />}/>
          <Route path='/user' element={<User />}/>
          <Route path='/test' element={<Testlar />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
