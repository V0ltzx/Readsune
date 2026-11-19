import '../styles/TelaLogin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../assets/Images/ReadSuneLogo.svg'
import ImagemLivrosLogin from '../assets/Images/ImagemLivrosLogin.jpg'
import '../styles/TelaLogin.css'

export default function TelaLogin() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [carregando, setCarregando] = useState(false)

    async function Entrar(e) {
        e.preventDefault()
        setCarregando(true)
        try {
            await login(email, senha)
            navigate('/livros')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className='login-grid'>

            <div className='login-imagem' style={{ backgroundImage: `url(${ImagemLivrosLogin})` }}>
                <div className='login-imagem__texto'>
                    <h2 className='login-imagem__titulo'>Seu espaço para novas histórias.</h2>
                    <p className='login-imagem__subtitulo'>Uma leitura de cada vez.</p>
                </div>
            </div>

            <div className='login-lado-form'>
                <form className='login-form' onSubmit={Entrar}>
                        <img src={Logo} alt='ReadSune' className='login-logo' />
                
                    <div>
                        <h1 className='login-titulo'>Bem-vindo de volta</h1>
                        <p className='login-subtitulo'>
                            Entre na sua conta e continue explorando o ReadSune.
                        </p>
                    </div>

                    <div className='login-campo'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email'
                            className='login-input'
                            type='email'
                            placeholder='seuemail@exemplo.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='login-campo'>
                        <label htmlFor='senha'>Senha</label>
                        <div className='input-wrapper'>
                            <input
                                id='senha'
                                className='login-input'
                                type={mostrarSenha ? 'text' : 'password'}
                                placeholder='Digite sua senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className='login-olho'
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type='submit' className='btn btn--primaria btn--block login-botao' disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>

                    <button type='button' className='login-link' onClick={() => navigate('/registro')}>
                        Ainda não possui conta? Criar conta
                    </button>

                </form>
            </div>

        </div>
    )
}