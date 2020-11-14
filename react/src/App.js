import { useState } from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';

function App() {
  const [user, setUser] = useState(null);
  const { userStatus } = useFindUser();
  
  return (
   <Router>
       <UserContext.Provider value={{ user, setUser }}>
       <Switch>
        <Route exact path="/" component={Register}/>
        <Route path="/home" component={Home}/>
        <Route component={NotFound}/>
        </Switch>
        </UserContext.Provider>
   </Router>
  );
}

export default App;
