
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Edit } from './pages/Edit'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
function App() {


  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
//https://wrokoutbuddy-api-7b6e29832f9c.herokuapp.com/api/workouts