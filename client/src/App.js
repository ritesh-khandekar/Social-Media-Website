import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import './App.css';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {

  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
