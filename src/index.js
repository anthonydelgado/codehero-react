import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();

ReactDOM.render((
    <Router history={history}>
        <Route path = "/code/:room" component = {App}>
        </Route>
    </Router>

), document.getElementById('root'));
registerServiceWorker();
