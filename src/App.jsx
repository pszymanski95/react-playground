import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Portals } from "./topics/portals/Portals";
import { Memo } from "./topics/memo/Memo";
import { Profilers } from "./topics/profilers/Profilers";
import { UseMemoUseCallback } from "./topics/use-memo-use-callback/UseMemoUseCallback";

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
    path: "/use-memo-use-callback",
    name: "UseMemo and useCalback",
    component: <UseMemoUseCallback />,
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
