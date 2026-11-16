import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from './pages/old/Login';
import LivroAdd from './pages/old/livro_add';
import TelaBusca from './pages/TelaBusca';
import TelaLateral from './components/TelaLateral';
import TelaLogin from './pages/TelaLogin';
 
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/livros" 
          element={
            <TelaLateral>
              <TelaBusca />
            </TelaLateral>
            
          } 
        />
        
        <Route path="/livro_add" element={<LivroAdd />} />
      </Routes>
    </AuthProvider>
      
  );
}