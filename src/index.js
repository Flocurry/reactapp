import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// Components
import App from './App';
// Bootsrap 4
import 'bootstrap/dist/css/bootstrap.min.css';
// FontAwesome
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
