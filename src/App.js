import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Settings from './components/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>

    </div>
  );
}
