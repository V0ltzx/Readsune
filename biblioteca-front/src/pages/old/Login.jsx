import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css'


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');

  const {login, logout, registrar} = useAuth();

  async function Registro(){
    await registrar(nome, email1, password1);
  }

  async function Entrar() {
    await login(email, password);
  }




  return (
    <>

      <div id="center">
        <div>
          <h3>Registro</h3>
        </div>

        <div className="Textbox">

          <p>Nome:</p>
          <input type="text" value={ nome }
            onChange={ (e) => setNome(e.target.value) } required />

          <p>Email</p>
          <input type="email" value={ email1 }
            onChange={ (e) => setEmail1(e.target.value) } required />
          <p>Senha</p>
          <input type="password" value={ password1 }
            onChange={ (e) => setPassword1(e.target.value) } required />

        </div>

        <button className="counter" onClick={ () => Registro() }>
          Registro
        </button>

      </div>

      <section id="barra"></section>


      <div id="center">
        <div>
          <h3>Login</h3>
        </div>

        <div className="Textbox">
          <p>Email</p>
          <input type="email" value={ email }
            onChange={ (e) => setEmail(e.target.value) } required />
          <p>Senha</p>
          <input type="password" value={ password }
            onChange={ (e) => setPassword(e.target.value) } required />

        </div>

        <button className="counter" onClick={ () => Entrar(password, email) }>
          Login
        </button>

        <button className="counter" onClick={ () => logout() }>
          Logout
        </button>

      </div>

      <div id="lado">

        <button className="counter" onClick={ () => navigate('/livros') }>
          Busca
        </button>


        <button className="counter" onClick={ () => navigate('/livro_add') }>
          Resgistar Livros
        </button>

      </div>
    </>
  )
}

export default Login
