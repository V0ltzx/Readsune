import '../styles/CriarConta.css'
import logo from   '../assets/Images/Logo.svg'
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import {Eye, EyeOff, ArrowLeft} from 'lucide-react'
import { useAuth } from "../contexts/AuthContext";

export default   function CriarConta(){

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [criando, setCriando] = useState(false);
    const [erro, setErro] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const { registrar } = useAuth();
    const navigate = useNavigate();


     async function handleSubmit(e) {
        e.preventDefault(); 
        setErro(null);
        setCriando(true);
        try{
            await registrar(nome, email, senha);
            setCriando(false);
            navigate('/home');
        } catch (err) {
            setErro(err?.response?.data?.message ?? "E-mail ou senha inválidos.");
        }
    }   

    return(

    <div className='split-screen'>
        <div className='split-screen__left'>
            <div className='imagem-sombra'></div>

            <div className='imagem-texto'>
                <h2>Seu espaço para novas histórias.</h2>
                <p>Uma leitura de cada vez.</p>
            </div>

            
        </div>

        <div className='split-screen__right'>  

            <div className='blocktext'>
                <button className='botao-home' onClick={() => navigate('/home')}>
                    <ArrowLeft />Vá até a página home 
                </button>

                <img src={logo} alt='logo do projeto' className='logo_projeto'/>
                
                <h1 className='fonte'> Criar Conta </h1>
                <p>Seu espaço para descobrir e guardar novas leituras.</p>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
            </div>    
                
            
            <form className='container-input' onSubmit= {handleSubmit}>

                <div className='coluna-grupo'>
                        <p> <label> Nome </label> </p>
                        <input 
                        type="text"  
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder='Como você se chama?'
                        required 
                        />
                        
                </div>

                    <div className='coluna-grupo'>            
                        <p> <label> E-mail </label> </p>
                        <input 
                        type="email" 
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        required
                        />
                    </div>

                    <div className='coluna-grupo'>
                        <p> <label> Senha </label> </p>
                        
                      <div className='input-senha-wrapper'>    
                            <input 
                            
                            type={showPassword ? 'text' : 'password'}
                            name="senha"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha"
                            required
                            />
                        
                            <button
                                type='button'
                                className='btn-olho'
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            
                                > 
                                {showPassword ? (<Eye color='#60747B'/>) : (<EyeOff color='#60747B'/>)} 
                            </button>
                      </div>
                    </div>
            

                    <div className='coluna-grupo'>
                        <button 
                        type='submit' 
                        className='btn btn--primaria btn--conta'> {criando ? "Criando..." : "Criar conta" } </button>
                    </div>

                    <button className='btn-link' onClick={() => navigate('/login')}>
                        Já possui uma conta? Entrar
                    </button>
            
                 </form>
                  
            </div>
            
        </div>
    )
}