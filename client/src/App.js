import React from "react";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar1";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Login";
import Registerscreen from "./screens/Registers";
import "antd/dist/antd.css";
import Bookingscreen from "./screens/Bookingscreen";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
import Adminscreen from "./screens/Adminscreen";
import Forgotpassword from "./screens/ForgotPassword";
import TextAnimation from "./screens/Intial";

function App() {
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/landing" exact component={Landingscreen} />
          <Route path="/home" exact component={Homescreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/register" component={Registerscreen} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            component={Bookingscreen}
          />
          <Route path="/profile" component={Profilescreen} />
          <Route path="/admin" component={Adminscreen} />
          <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/" component={TextAnimation}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
