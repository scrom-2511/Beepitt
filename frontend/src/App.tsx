import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Signin from './pages/Signin';
import ErrorDetails from './pages/ErrorDetails';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="bg-primary h-screen w-screen overflow-y-scroll">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/errDetails/:errMsgID" element={<ProtectedRoute><ErrorDetails /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
