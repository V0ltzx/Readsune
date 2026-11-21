import { useState, useEffect, useContext } from 'react';
import api from "../api/client"
import { useAuth } from '../contexts/AuthContext';
import { Plus } from 'lucide-react';    
import '../styles/TelaBusca.css'
import CardLivro from '../components/CardLivro'
import { BuscaContext } from '../components/TelaLateral' /*Importando o que já existe na tela lateral */
import TelaAdicionarLivros from '../components/TelaAdicionarLivros'

export default function TelaBusca(){

    const [livros, setLivros] = useState([]);
    const { busca } = useContext(BuscaContext)
    const {usuario} = useAuth();
    const [TelaAddAberto, setTelaAddAberto] = useState(false)


    useEffect(() => {
        BuscarLivros();
    }, [busca]);


    async function BuscarLivros() {
        api.get("/livros", {params: {busca}})
        .then((res) => setLivros(res.data.data));
    }




    return (
        <div className='tela'>
            <div>
                <p className='titulo-menor-topo'>ACERVO DE LIVROS</p>
                <div className='area-titulo-botao'>
                    <h1 className='titulo'>
                        {busca ? 'Resultados da pesquisa' : 'Veja os livros da nossa biblioteca'}
                    </h1>
                    {usuario?.perfil  === 'bibliotecario' && (
                            <button className='botao-add' onClick={() => setTelaAddAberto(true)}><Plus/></button>
                        ) 
                    }

                    
                </div>
                
                <p className='texto-menor'>
                    
                    {busca ? `${livros.length} resultados para a pesquisa: "${busca}"` : `Possuímos ${livros.length} livros no nosso catálogo.`}
                </p>
            </div>
            
            
            {livros.map((livro) => (
                    
                    <CardLivro  key={livro.livro_id} livro = {livro} onEmprestar={BuscarLivros}/>
                ))}
            
            {TelaAddAberto && (
                <TelaAdicionarLivros
                    onSalvar={() => BuscarLivros()}
                    onClose={() => setTelaAddAberto(false)}
                />
            )}
            
        </div>
        
        
    )
}