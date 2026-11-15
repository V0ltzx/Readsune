import { useState, useEffect } from 'react';
import "../styles/emprestimos.css"
import CardEmprestimo from '../components/CardEmprestimos'
import api from "../api/client"   

export default function Emprestimos(){

    // const [emprestimos, setEmprestimos] = useState([]);

    // useEffect (() => {
    //     buscarEmprestimos();
    // }, []);

    // async function buscarEmprestimos(){
    //     api.get('/emprestimos')
    //     .then((res) => setEmprestimos(res.data.data));
    // }


    return(
        <div className="tela-emprestimo">
            <p className="titulo-topo-emprestimo">MEUS EMPRÉSTIMOS</p>

            <h1 className="titulo-emprestimo">Meus Empréstimos</h1>

            <p className="texto-menor-emprestimo">Acompanhe seu histórico de leituras e os prazos de devolução</p>

            <br /><br />

            <CardEmprestimo/>


        </div>
    )
}