import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import Home from './components/Home'
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/login" component={Login} />
            <Route path={"/accounts/:account_id"} component={Home} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
