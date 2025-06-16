import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRLanding from './components/QRLanding';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
