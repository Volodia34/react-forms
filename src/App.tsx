import { Routes, Route } from 'react-router-dom';
import Main from './routes/Main/Main';
import UncontrolledForm from './routes/UncontrolledForm/UncontrolledForm';
import HookForm from './routes/HookForm/HookForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/hook-form" element={<HookForm />} />
    </Routes>
  );
}

export default App;
