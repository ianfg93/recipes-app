import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/myProvider';
import Login from './components/Login';
import Meals from './components/Meals';

function App() {
  return (
    /* <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div> */
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
      </Switch>
    </Provider>
  );
}

export default App;
