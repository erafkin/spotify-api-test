import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/home';
import Playlist from './components/playlist';

const FallBack = () => {
  return <div>URL not found</div>;
};
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/playlist" component={Playlist} /> {/* home always has to be at the bottom of this stack */}
        <Route path="/" component={Home} /> {/* home always has to be at the bottom of this stack */}
        <Route component={FallBack} />
      </Switch>
    </Router>
  );
};

export default App;
