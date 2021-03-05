import {BrowserRouter, Route} from 'react-router-dom';
import login from './components/login';
import signup from './components/signUp';
import home from './components/home';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer/>
        <Route exact path="/" component={home}/>
        <Route path="/login" component={login}/>
        <Route path="/signup" component={signup}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
 