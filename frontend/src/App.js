import {BrowserRouter, Route} from 'react-router-dom';
import login from './components/login';
import signup from './components/signUp';
import home from './components/home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/signup" component={signup}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
 