import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';

function App() {

  return (
    <Router>
      <div className="bg-[#141414] h-screen w-screen overflow-y-scroll">
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
