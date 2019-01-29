import ReactDOM from 'react-dom';
import Home from './pages/home';
import Callback from './pages/callback';
import { Store } from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <div>                
                <Route exact path="/" component={Home} />
                <Route exact path="/callback:access_token?" component={Callback} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));