import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";

function App() {

  return (
      <Router>
          <Routes>
              <Route path='/' Component={Home}/>
              <Route path='/login' Component={Login}/>
          </Routes>
      </Router>
  )
}

export default App
