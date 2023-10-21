import Signup from './Signup';
import Signin from './Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';

import './App.css'

function App() {
  

  return (
    <>

<Router>
            <Routes>
              //Admin Routes
                <Route path="/admin/signin" element={<Signin />} />
                <Route path="/admin/signup" element={<Signup />} />
                <Route path="/admin/Homepage" element={<Homepage />} />

              //User Routes
                <Route path="/user/signin" element={<Signin />} />
                <Route path="/user/signup" element={<Signup />} />
                <Route path="/user/Homepage" element={<Homepage />} />

              
            </Routes>
        </Router>


    
    </>
   
  );
}

export default App
