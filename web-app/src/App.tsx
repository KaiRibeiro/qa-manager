import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Navbar from "./components/shared/navbar/Navbar";
import TestPlans from "./routes/TestPlans/TestPlans";

function App() {

  return (
      <Router>
          <Routes>
              <Route path='/login' Component={Login}/>
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
          </Routes>
      </Router>
  )
}

export default App
