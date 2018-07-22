import React, { Component } from 'react';
import MainComponent from './components/Main.js';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div className="App" style={{height: '100%'}}>
            <HashRouter>
                <Switch>
                    <Route render={(props) => (<MainComponent {...props}/>)}/>
                </Switch>
            </HashRouter>
        </div>
    );
  }
}

export default App;
