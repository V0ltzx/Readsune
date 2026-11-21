import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from './pages/old/Login';
import LivroAdd from './pages/old/livro_add';
import TelaBusca from './pages/TelaBusca';
import Emprestimo from './pages/Emprestimos'
import TelaLateral from './components/TelaLateral';
import TelaLogin from './pages/TelaLogin';
import CriarConta from './pages/criar_conta';
 
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        // <Route path="/" element={<Home />} />
        <Route path="/livros" 
          element={
            <TelaLateral>
              <TelaBusca />
            </TelaLateral>
            
          } 
        />

        <Route path='emprestimos'
          element={
            <TelaLateral>
              <Emprestimo/>
            </TelaLateral>
            }
          />
        <Route path="/cadastro" element={<CriarConta />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/livro_add" element={<LivroAdd />} />
      </Routes>
    </AuthProvider>
      
  );
}