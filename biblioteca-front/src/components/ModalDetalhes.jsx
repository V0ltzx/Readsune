import '../styles/Modal.css'
import { Trash, Ban, BookOpen, X } from 'lucide-react'
import interrogacao from '../assets/interrogacao.jpg'

export default function ModalDetalhes({ onClose }) {

    return (


        <div className="modal-overlay" onClick={onClose}>
            
            <div  className="modal-conteudo" onClick={(e) => e.stopPropagation()}>

                <div className='modal-topo'>
                    <p className='titulo-topo'>DETALHES DO LIVRO</p>

                    <button className='botao-topo'  onClick={onClose}><X size={18}/></button>
                </div>

                <div className="modal-info">     

                    <img 
                        src={ interrogacao }
                        alt="sem capa por enquanto"
                    />

                    <div className='espaco'> {/*Mudar a classe do css*/}

                        <div>
                            <h1 className='titulo-livro'>Titulo</h1>
                            <p className='titulo-autor'> De Autor</p>
                        </div>

                        <div>
                            <div className='detalhe-livro-titulo titulos-menores'>
                                <p>Data</p>
                                <p>Gênero</p>
                            </div>
                                        
                            <div className='detalhe-livro-conteudo'>
                                <p>DD/MM/YY</p>
                                <p>Não informado</p>
                            </div>
                        </div>

                        <div className='linha'/>
                        
                        <div>
                            <p className='sinopse'>Sinopse</p>
                            <p className='detalhe-livro-sinopse'>texto de teste: Durante os últimos capítulos de berserk, o nome da obra teve outro significado. O nome Berserk poderia se referir ao estado de fúria incontrelável (o que o protagonista de berserk faz com bastante frequência). Porém, nos últimos capítulos (Spoiler a frente) foi revelado que guts está em um estado entre o mundo físico, e o mundo astral (pois sua mãe acabou dando a luz quando já estava morta), e na tradição Islâmica/Árabe, o termo Barzakh é o estado intermediário ou o "véu" onde a alma aguarda entre a morte e a ressurreição. Então o nome Berserk pode significar duas coisas agr, ao estado de fúria incontrolável de guts, e o seu estado espiritual dele. Insano</p>
                        </div>
                        
                    </div>


                </div>

                <div className='linha'/>

                <div className='area-botao'>
                    <button className='botao-excluir'><Trash/>Excluir</button>
                    <button className='botao-excluir'><Ban/>Indisponível</button>
                    <button className='botao-emprestar'><BookOpen/>Emprestar</button>

                </div>

            </div>

        </div>
    );
}
