import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Navbar from "./components/navbar/Navbar";

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
          </Routes>
      </Router>
  )
}

export default App
