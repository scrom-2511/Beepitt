import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Getip from "./pages/Getip";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster theme="dark" />
      <Router>
        <div className="bg-background h-screen w-screen flex justify-center">
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/getmyip" element={<Getip />} />
            <Route
              path="/dashboard"
              element={
                  <Dashboard />
              }
            />
            {/* <Route
              path="/errDetails/:errMsgID"
              element={
                <ProtectedRoute>
                  <ErrorDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
