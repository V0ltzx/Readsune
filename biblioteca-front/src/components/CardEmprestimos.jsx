import "../styles/cardEmprestimos.css"
import { useState } from "react";
import interrogacao from '../assets/interrogacao.jpg'
import api from '../api/client'

export default function CardEmprestimo( {emprestimo, onDevolver } ){

    const diffMs = new Date(emprestimo.data_devolucao) - new Date();
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const atrasado = dias < 0;

    const [devolvendo, setDevolvendo] = useState(false);

    async function Devolver(e) {
        e.preventDefault()
        setDevolvendo(true);
        try{
            await api.patch(`/emprestimos/${emprestimo.emprestimo_id}/devolucao`);
            await onDevolver();
        } catch(err){
            console.log(err?.response?.data?.massage ?? "Não foi possível devolver o livro");
        }
        finally{
            setDevolvendo(false);
        }
    }


    return (
        <div className={`card-emprestimo ${emprestimo.data_devolvido && 'card-emprestimo-devolvido'}
                                        ${atrasado && 'card-emprestimo-atrasado'}`}>

{/*-==============================CAPA=============================- */}
            <div className="capa-emprestimo">   
                <img className="capa-livro-emprestimo" src={emprestimo?.livro?.capa ? `${emprestimo.livro.capa}` : `${interrogacao}`} alt="" />
            </div>
            
{/*-==============================DATAS DE EMPRÉSTIMOS=============================- */}
            <div className="card-detalhes-emprestimo">
                <h1 className="titulo-card-emprestimo">{emprestimo?.livro?.titulo}</h1>

                <div className="card-data-emprestimo-pai">
                    
                    <div className="card-data-emprestimo">
                        <p className="titulo-data-emprestimo">Emprestado em</p>
                        <p className="texto-data-emprestimo">
                            {new Date(emprestimo.data_emprestimo.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                    day: '2-digit', 
                                    month: 'short',
                                    year: 'numeric'
                                })
                            }
                        </p>                        
                    </div>

                    <div className="card-data-emprestimo">
                        {emprestimo.status === 'devolvido' &&(
                            <div>
                                <p className="titulo-data-emprestimo">Devolvido em </p>
                                <p className="texto-data-emprestimo texto-data-emprestimo-azul">
                                    {new Date(emprestimo.data_devolvido?.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                        day: '2-digit', 
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}

                        {emprestimo.status === 'emprestado' &&(
                            <div>
                                <p className="titulo-data-emprestimo">Devolver até </p>
                                <p className={`texto-data-emprestimo ${atrasado ? 'texto-data-emprestimo-vermelho' : 'texto-data-emprestimo-azul'}`}>
                                    {new Date(emprestimo.data_devolucao.replace(/-/g, '/')).toLocaleDateString('pt-BR', { 
                                        day: '2-digit', 
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>

{/*==================================== Canto Direito do card==================== */}
            <div className="area-acoes-emprestimo">
                 <div className={`texto-prazo ${atrasado ? 'texto-prazo-vermelho' : 'texto-prazo-azul'}`}>
                    {emprestimo.status === 'devolvido' ? (
                        <p>Devolvido</p>
                    ) : (
                        (`${atrasado && !emprestimo.data_devolvido 
                            ? `Fora do prazo · ${Math.abs(dias)} dias`  
                            : `No prazo · ${dias} dias`}`)
                        )}
                </div>

                <div>
                    {emprestimo.status === 'emprestado' &&(
                    <button className="btn btn--primaria" onClick={Devolver}>
                        {devolvendo ? 'Devolvendo...' : "Devolver"}
                    </button>
                )}
                </div>

            </div>

        </div>

    )
}