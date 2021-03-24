import {Route, Switch} from 'react-router-dom'
import About from "./about";
import Login from './registerLogin'
import Register from './registerLogin/register'

function App() {
    return (
        <div>
            <Switch>
                <Route path='/about' component={About}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        </div>
    );
}

export default App;
