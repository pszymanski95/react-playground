import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Portals } from "./topics/portals/Portals";
import { Memo } from "./topics/memo/Memo";
import { Profilers } from "./topics/profilers/Profilers";
import { MemoHooks } from "./topics/memo-hooks/MemoHooks";
import { ConcurrentMode } from "./topics/concurrent-mode/ConcurrentMode";

const routes = [
  {
    path: "/portals",
    name: "Portals",
    component: <Portals />,
  },
  {
    path: "/memo",
    name: "Memo",
    component: <Memo />,
  },
  {
    path: "/profilers",
    name: "Profilers",
    component: <Profilers />,
  },
  {
    path: "/memo-hooks",
    name: "Memo hooks",
    component: <MemoHooks />,
  },
  {
    path: "/concurrent-mode",
    name: "Concurrent mode",
    component: <ConcurrentMode />,
  },
];

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {routes.map(({ path, name }) => (
              <li>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact path={path}>
              {component}
            </Route>
          ))}
          <Route default path="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
