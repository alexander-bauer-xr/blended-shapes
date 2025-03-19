// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Story from './pages/Story';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Layout>
  );
}

export default App;