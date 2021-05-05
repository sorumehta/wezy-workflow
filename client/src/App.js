import {
    BrowserRouter,
    Switch,
    Route,
    //Redirect
} from 'react-router-dom'

import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path={"/"} component={Home} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;