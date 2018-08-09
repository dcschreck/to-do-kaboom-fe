import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Index from './components/Index.js';
import Active from './components/Active.js';
import Historical from './components/Historical.js';

class App extends Component {
    render() {
        return (
          <div className="App">
              <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/active'>Active To-Dos</Link></li>
                        <li><Link to='/historical'>Historical To-Dos</Link></li>
                    </ul>
                </nav>
                <h1>To-Do KaBoom </h1>
              </header>
              <main>
                <Route exact path="/" component={Index} />
                <Route path="/active" component={Active} />
                <Route path="/historical" component={Historical} />
              </main>
          </div>
        );
    }
}

export default App;
