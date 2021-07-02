import './App.css';
import { Header } from './shared/common';
import { Footer } from './shared/common';
import About from './pages/About/About.js';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import Shop from './pages/Shop/Shop';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/about" component={About} />
      <Route exact path="/privacy" component={Privacy} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/myaccount" component={Account} />
      <Footer />
    </div>
  );
}

export default App;
