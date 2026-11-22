import '../styles/TelaInicial.css';
import { BookOpen, Search, Bookmark, LogIn } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function TelaInicial() {
    const { usuario } = useAuth();
    const Navigate = useNavigate();

    return (
        <div className='inicial'>
            <div className='inicial-topo'>
                <div className='home__topo'>
                    SUA BIBLIOTECA DIGITAL
                </div>

                <div className='inicial-topo'>
                    <h1>Bem-vindo ao Readsune</h1>
                </div>

                <div className='inicial-conteudo'>
                    <div className='inicial-conteudo-icone'>
                        <BookOpen size={64} strokeWidth={1} />
                    </div>

                    <div className='inicial-conteudo-info'>
                        <h1>Sua próxima leitura começa aqui</h1>
                        <p>Use a busca para encontrar um título, e empreste livros que você tenha interesse.</p>
                    </div>
                </div>

                <div className='btn-inicial'>
                    <button className='btn-inicial' onClick={() => Navigate('/livros')}>
                        <Search /><p>Busque uma leitura</p>
                    </button>

                    <p className='separador'>|</p>

                    <button onClick={usuario ? () => Navigate('/emprestimos') : () => Navigate('/cadastro')}>
                        {usuario ? (
                            <div className='btn-inicial'>
                                <Bookmark />
                                <p>Veja seus empréstimos</p>
                            </div>
                        ) : (
                            <div className='btn-inicial'>
                                <LogIn />
                                <p>Entre ou se registre</p>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}