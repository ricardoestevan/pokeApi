
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PokeInfo from './pages/PokeInfo'
import Pokedex from './pages/Pokedex'
import ProtectedRoutes from './pages/ProtectedRoutes'

function App() {

return (
<div className='main__container'>
  <figure>
    <img className='main__img' src='/img/top1.png' alt=""/>
  </figure>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route element={<ProtectedRoutes/>}>
      <Route path='/pokedex' element={<Pokedex/>}/>
      <Route path='/pokedex/:id' element={<PokeInfo/>}/> 
  </Route>
  </Routes>
</div>
  )
}

export default App
