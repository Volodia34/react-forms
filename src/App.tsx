import { Routes, Route } from 'react-router-dom';
import Main from './routes/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;