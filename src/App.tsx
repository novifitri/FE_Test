import Layout from './components/templates/Layout'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import MasterData from './pages/MasterData'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route element={<Layout/>}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/master-data' element={<MasterData />} />
        </Route>
      </Routes>      
    </>
  )
}

export default App
