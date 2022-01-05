import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
 class App extends Component {
   render() {
     return (
       <div>
         <Router>
            <NavBar/>
            <Routes>
              <Route exact path="/" element={<News key="general" pageSize={6} country={"us"} category={"general"}/>}/>
              <Route exact path="/health" element={<News key="health" pageSize={6} country={"us"} category={"health"}/>}/>
              <Route exact path="/sports" element={<News key="sports" pageSize={6} country={"us"} category={"sports"}/>}/>
              <Route exact path="/technology" element={<News key="technology" pageSize={6} country={"us"} category={"technology"}/>}/>
              <Route exact path="/entertainment" element={<News key="entertainment" pageSize={6} country={"us"} category={"entertainment"}/>}/>
              <Route exact path="/science" element={<News key="science" pageSize={6} country={"us"} category={"science"}/>}/>
            </Routes>
         </Router>
       </div>
     );
   }
 }
 
 export default App;
 