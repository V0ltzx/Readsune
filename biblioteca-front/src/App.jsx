import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import TelaBusca from './pages/TelaBusca';
import Emprestimo from './pages/Emprestimos'
import TelaLateral from './components/TelaLateral';
import TelaLogin from './pages/TelaLogin';
import CriarConta from './pages/criar_conta';
import TelaInicial from './pages/TelaInicial';
 
export default function App() {
  const Navigate = useNavigate();

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
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
        <Route path="/home" element={
          <TelaLateral>
            <TelaInicial />
          </TelaLateral>
        } />
      </Routes>
    </AuthProvider>
      
  );
}

