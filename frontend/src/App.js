import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from './Components/reusuable/PrivateRoute'
import Register from "./Components/scripts/Auth/Register";
import Login from "./Components/scripts/Auth/Login";
import Dashboard from './Components/scripts/Auth/Dashboard/Dashboard'
import Example from './Components/scripts/hooks/Example'
import Drawer from './Components/reusuable/Drawer'
import Resource from './Components/scripts/Resource/Resource'
import Student from './Components/scripts/Student/Student';
import setAuthToken from "./Components/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
import AddResources from "./Components/scripts/Resource/AddResources";
function App() {
  if (localStorage.getItem("jwtToken")) {
    let token = localStorage.getItem('jwtToken')
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(onLoginSuccess(decoded));
  }
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/example" component={Example} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/addresource" component={AddResources} />
        <Route exact path="/drawer" component={Drawer} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/resources" component={Resource} />
        <PrivateRoute exact path="/students" component={Student} />
        
        
      </Router>
    </Provider>
  );
}

export default App;
