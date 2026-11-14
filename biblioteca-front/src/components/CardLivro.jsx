import { useContext, useState } from 'react'
import '../styles/CardLivro.css'
import { ArrowRight } from 'lucide-react'
import ModalDetalhes from './ModalDetalhes';

export default function CardLivro( {livros} ){

    const [modalAberto, setModalAberto] = useState(false);

    return (

        <>
        
        <div className='card'>
            <div  className='capa'>
                <img src={livros.capa}  className='imagem'/>
            </div>
            
            <div className='info-livro'>
                
                <h1 className='titulo-card'>{ livros.titulo }</h1>
                <p className='titulo-menor-card'>ISBN: { livros.isbn }</p>

                <div>
                    <button className='detalhes-button' onClick={() => setModalAberto(true)}>
                        Ver detalhes <ArrowRight/>
                    </button> 
                </div>
                
            </div>

        </div>

        {modalAberto &&(
            <ModalDetalhes onClose={() => setModalAberto(false)}/>
        )}

        </>
    )
}