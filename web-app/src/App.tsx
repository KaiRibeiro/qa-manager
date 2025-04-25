import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Navbar from './components/shared/navbar/Navbar';
import TestPlans from './routes/TestPlans/TestPlans';
import TestPlanDetails from './components/test-plans/test-plan-details/TestPlanDetails';
import TestCases from './routes/TestCases/TestCases';
import Register from './routes/Register/Register';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AuthProvider from './context/AuthContext/AuthProvider';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />

          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route
              path="/testplans"
              element={
                <>
                  <Navbar />
                  <TestPlans />
                </>
              }
            />
            <Route
              path="/testplans/:id"
              element={
                <>
                  <Navbar />
                  <TestPlanDetails />
                </>
              }
            />

            <Route
              path="/testcases"
              element={
                <>
                  <Navbar />
                  <TestCases />
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
