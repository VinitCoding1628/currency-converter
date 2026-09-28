import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ConverterPage from './pages/ConverterPage'
import LandingPage from './pages/LandingPage'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='landing-bg -mt-5 p-0'>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/converter' element={<ConverterPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App