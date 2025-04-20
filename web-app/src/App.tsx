import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Navbar from './components/shared/navbar/Navbar';
import TestPlans from './routes/TestPlans/TestPlans';
import TestPlanDetails from './components/test-plans/test-plan-details/TestPlanDetails';
import TestCases from './routes/TestCases/TestCases';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login} />
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
      </Routes>
    </Router>
  );
}

export default App;
