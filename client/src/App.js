import React, { useEffect, useContext, createContext, useReducer } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import CreatPostPage from "./pages/CreatePost";
import { initialstate, UserReducer } from "./reducer/userReducer";
import "./App.css";

export const userContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/addpost" component={CreatPostPage} />
      </Switch>
    </div>
  );
};
export const App = () => {
  const [state, dispatch] = useReducer(UserReducer, initialstate);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <Routing />
    </userContext.Provider>
  );
};

export default App;
