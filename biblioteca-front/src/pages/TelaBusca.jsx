import { useState, useEffect, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/TelaBusca.css'
import CardLivro from '../components/CardLivro'
import { BuscaContext } from '../components/TelaLateral' /*Importando o que já existe na tela lateral */

export default function TelaBusca(){

    

    const token = localStorage.getItem('token');
    const [livros, setLivros] = useState([]);
    const { busca } = useContext(BuscaContext)
    const {usuario} = useAuth();

    useEffect(() => {

        async function BuscarLivros() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/livros`, {
                headers: { 'Authorization': `Bearer ${token}`, }
            });
            const dados = await res.json();
            setLivros(dados.data ?? dados);

        }
        BuscarLivros();

    }, []);


    return (
        <div className='tela'>
            <div>
                <p className='titulo-menor-topo'>ACERVO DE LIVROS</p>
                <div className='area-titulo-botao'>
                    <h1 className='titulo'>
                        {busca ? 'Resultados da pesquisa' : 'Veja os livros da nossa biblioteca'}
                    </h1>
                    {usuario?.perfil  === 'bibliotecario' && (
                            <button className='botao-add'><Plus/></button>
                        ) 
                    }

                    
                </div>
                
                <p className='texto-menor'>
                    
                    {busca ? `${livros.length} resultados para a pesquisa: "${busca}"` : `Possuímos ${livros.length} livros no nosso catálogo.`}
                </p>
            </div>
            
            
            {livros.map((livro) => (
                    
                    <CardLivro  key={livro.livro_id} livro = {livro}/>
                ))}
            

            
        </div>
        
        
    )
}