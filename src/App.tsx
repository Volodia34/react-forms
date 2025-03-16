import { Routes, Route } from 'react-router-dom';
import Main from './routes/Main/Main.tsx';

import UncontrolledForm from './routes/UncontrolledForm/UncontrolledForm.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
    </Routes>
  );
}

export default App;
