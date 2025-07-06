import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Signin from './pages/Signin';

function App() {

  return (
    <Router>
      <div className="bg-primary h-screen w-screen overflow-y-scroll">
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
