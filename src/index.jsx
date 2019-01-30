

import 'normalize.css';
import ReactDOM from 'react-dom';
import { Store } from './store';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App  from './pages/app';


ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));