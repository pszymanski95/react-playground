import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Portals } from './topics/portals/Portals';
import { Memo } from './topics/memo/Memo';
import { UseMemoUseCallback } from './topics/use-memo-use-callback/UseMemoUseCallback';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/portals">Portals</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/use-memo-use-callback">useMemo and useCallback</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/portals">
            <Portals />
          </Route>
          <Route path="/memo">
            <Memo />
          </Route>
          <Route path="/use-memo-use-callback">
            <UseMemoUseCallback />
          </Route>
          <Route default path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
