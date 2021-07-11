import './App.css';
import { Header } from './shared/common';
import { Footer } from './shared/common';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <AllRoutes />
      <Footer />
      </Router>
    </div>
  );
}

export default App;
