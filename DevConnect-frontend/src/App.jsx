import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import EditProfile from './pages/EditProfile'
import AddProject from './pages/AddProject'
import SearchProject from './pages/SearchProject'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<AuthPage />} />
        <Route  path='/home' element={<HomePage />} />
        <Route  path='/edit-profile' element={<EditProfile />} />
        <Route  path='/add-project' element={<AddProject />} />
        <Route  path='/search-projects' element={<SearchProject />} />
      </Routes>
      {/* <div className='font-bold text-8xl'>Hello</div> */}
    </Router>
  )
}

export default App
