import { useState, useEffect } from 'react';
import "../styles/emprestimos.css"
import CardEmprestimo from '../components/CardEmprestimos'
import api from "../api/client"   

export default function Emprestimos(){

    const [emprestimos, setEmprestimos] = useState([]);

    useEffect (() => {
        buscarEmprestimos();
    }, []);

    async function buscarEmprestimos(){
        await api.get('/emprestimos')
        .then((res) => {setEmprestimos(res.data.data); console.log(res.data.data);});
        
  
    }


    return(
        <div className="tela-emprestimo">

            <div>
                <p className="titulo-topo-emprestimo">MEUS EMPRÉSTIMOS</p>
                <h1 className="titulo-emprestimo">Meus Empréstimos</h1>
                <p className="texto-menor-emprestimo">Acompanhe seu histórico de leituras e os prazos de devolução</p>
            </div>
            

            
            <div className='tela-emprestimo'>
                {emprestimos.map((emprestimo) => (
                    <CardEmprestimo emprestimo={emprestimo} key={emprestimo.emprestimo_id} onDevolver={buscarEmprestimos}/>

                ))}

            </div>
            
            


        </div>
    )
}