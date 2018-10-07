import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Components
import App from './App';
import Login from './components/login/Login';

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
