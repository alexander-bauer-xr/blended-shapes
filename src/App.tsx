// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Story from './pages/Story';
import Contact from './pages/Contact';
import CaseCarousel from './components/CaseCarousel';
import './styles/global.scss';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cases/:slug" element={<CaseCarousel />} />
      </Routes>
    </Layout>
  );
}

export default App;