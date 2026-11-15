import '../styles/Modal.css'
import { Trash, Ban, BookOpen, X } from 'lucide-react'
import interrogacao from '../assets/interrogacao.jpg'

export default function ModalDetalhes({ livro, onClose }) {

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
                    <button className='btn botao-excluir'><Trash/>Excluir</button>
                    <button className='btn botao-excluir'><Ban/>Indisponível</button>
                    <button className='btn btn--primaria'><BookOpen/>Emprestar</button>

                </div>

            </div>

        </div>
    );
}
