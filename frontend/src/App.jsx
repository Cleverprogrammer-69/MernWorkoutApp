
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Edit } from './pages/Edit'
import Home from './pages/Home'

function App() {


  return (
  <div className="app">
    <BrowserRouter>
    <Navbar />
    <div className="pages">
      <Routes>
        <Route 
          path='/'
          element={<Home />}
        />
        <Route
          path='/edit/:id'
          element={<Edit />}
        />
      </Routes>
    </div>
      
    </BrowserRouter>
  </div>
  )
}

export default App
