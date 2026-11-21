import '../styles/Modal.css'
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trash, Ban, BookOpen, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import interrogacao from '../assets/interrogacao.jpg'
import api from '../api/client';

export default function ModalDetalhes({ livro, onClose, onEmprestar }) {

    const {usuario} = useAuth();
    const [emprestando, setEmprestando] = useState(false);
    const [excluindo, setExcluindo] = useState(false);
    const Navigate = useNavigate();

    async function handleEmprestar(e){
        e.preventDefault();
        setEmprestando(true);

        try{
            await api.post('/emprestimos', {livro_id: livro.livro_id});
        } catch(err){
            console.log(err?.response?.data?.message ?? "Não foi possível emprestar o livro");
        } finally{
            setEmprestando(false);
            onEmprestar();

        }
    }

    async function handleExcluir(e){
        e.preventDefault();
        setExcluindo(true);
        try{
            api.delete(`/livros/${livro.livro_id}`);
        } catch(err){
            console.log(err?.message ?? 'Não foi possível excluir o livro');
        } finally{
            setExcluindo(false);
            onClose()
        }
    }


    return (


        <div className="modal-overlay" onClick={onClose}>
            
            <div  className="modal-conteudo" onClick={(e) => e.stopPropagation()}>

                <div className='modal-topo'>
                    <p className='titulo-topo'>DETALHES DO LIVRO</p>

                    <button className='botao-topo'  onClick={onClose}><X size={18}/></button>
                </div>

                <div className="modal-info">     

                    <img 
                        src={ livro.capa }
                        alt="sem capa por enquanto"
                    />

                    <div className='espaco'> {/*Mudar a classe do css*/}

                        <div>
                            <h1 className='titulo-livro'>{livro.titulo}</h1>
                            <p className='titulo-autor'> De {livro.autor.nome}</p>
                        </div>

                        <div>

                            <div className='detalhe-livro-area'>
                                <div className='detalhe-livro-conteudo'>
                                    <p className='titulos-menores'>ANO DE PUBLICAÇÃO</p>
                                    <p>{livro.ano_publicacao}</p>
                                    
                                </div>
                                            
                                <div className='detalhe-livro-conteudo'>
                                    <p className='titulos-menores'>GÊNERO</p>
                                    <p>{livro.genero}</p>
                                    
                                </div>
                            </div>
                            
                        </div>

                        <div className='linha'/>
                        
                        <div>
                            <p className='sinopse'>Sinopse</p>
                            
                            <p className='detalhe-livro-sinopse'>{livro.sinopse ? `${livro.sinopse}` : "Este livro não tem sinopse"}</p>
                        </div>
                        
                    </div>


                </div>

                <div className='linha'/>

                <div className='area-botao'>

                    {!livro.emprestado ? (
                        <button className='btn btn--primaria' onClick={usuario ? handleEmprestar : () => Navigate('/')}>
                            <BookOpen/>{emprestando ? 'Emprestando...' : 'Emprestar'}
                        </button>
                    ) : (
                        <button className='btn botao-excluir botao-excluir-indisponivel'>
                            <Ban/>Indisponível
                        </button>
                    )}
                    
                    
                    {usuario?.perfil === 'bibliotecario' && (
                        <button className='btn botao-excluir' onClick={handleExcluir}><Trash/>{excluindo ? 'Excluindo...' : 'Excluir'}</button>
                    )}
                    

                </div>

            </div>

        </div>
    );
}
