
import { SearchRepositories} from './components/SearchRepositories/SearchRepositories';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Switch, Route } from 'wouter';
import { RepositoryDetails } from './components/RepositorieDetails/RepositoryDetails';
function App() {

  return (
    <Switch>
      <Route path="/" component={SearchRepositories}/>
      <Route path="/repo/:owner/:repository" component={RepositoryDetails}/>
      {/* en el caso que no entre a ninguna */}
      <Route>404, Not Found</Route>
    </Switch>
  )
}

export default App
