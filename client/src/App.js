import React, {useState, useMemo} from "react"

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Home from './components/Home'
import Login from "./components/Login";
import {UserContext} from "./UserContext"
import Register from "./components/Register";

function App() {
    const [user, setUser] = useState(null)
    const providerValue = useMemo(()=> ({ user, setUser }), [user, setUser])
  return (
    <BrowserRouter>
        <Switch>
            <UserContext.Provider value={providerValue}>
                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route path={"/accounts/:account_id"} component={Home} />
            </UserContext.Provider>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
