
import './App.css';
import Login from './components/login';
import Navbar from './components/navbar';
import PostPage from './components/posts';
import SignUp from './components/signup';
import { BrowserRouter as Router, Route,Routes, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App"> 
    <Navbar/>
       <Router>
       <Routes>
          <Route exact path="/" element={<PostPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

       </Router>
      
       
    </div>
  );
}

export default App;
