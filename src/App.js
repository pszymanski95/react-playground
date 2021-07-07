import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Portals } from './topics/portals/Portals';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/portals">Portals</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/portals">
            <Portals />
          </Route>
          <Route default path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
