import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home'

const FallBack = () => {
    return <div>URL not found</div>;
  };
const App = () => {
  return(
    <Router>
    <div>
      <Switch>
        <Route path='/' component={Home} /> {/* home always has to be at the bottom of this stack */}
        <Route component={FallBack} />
      </Switch>
    </div>
  </Router>
  );
}
  
export default App;