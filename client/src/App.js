import React from "react";
import {Switch,Route} from 'react-router-dom';
import Header from "./components/Header";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import CreatPostPage from "./pages/CreatePost"
import "./App.css";
const App = () => {
  return (
    <div>
      <Header />
      <Switch>
      <Route exact path='/' component={HomePage}/>
        <Route exact path='/signup' component={SignupPage}/>
        <Route exact path='/login' component={LoginPage}/>
        <Route exact path='/home' component={HomePage}/>
        <Route exact path='/profile' component={ProfilePage}/>
        <Route exact path='/addpost' component={CreatPostPage}/>
      </Switch>
    </div>
  );
};

export default App;
