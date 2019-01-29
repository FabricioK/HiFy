import ReactDOM from 'react-dom';
import Home from './pages/home';
import { Store } from './store';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <div>
                <Route path="/:access_token?" component={Home} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));