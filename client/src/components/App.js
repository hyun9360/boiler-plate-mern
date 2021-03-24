import {Route, Switch} from 'react-router-dom'
import About from "./about";
import Login from './registerLogin'

function App() {
    return (
        <div>
            <Switch>
                <Route path='/about' component={About}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </div>
    );
}

export default App;
