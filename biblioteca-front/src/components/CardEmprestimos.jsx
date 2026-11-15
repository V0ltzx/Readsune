import "../styles/cardEmprestimos.css"
import interrogacao from '../assets/interrogacao.jpg'

export default function CardEmprestimo(){

    return (

        <div className="card-emprestimo">
{/*-==============================CAPA=============================- */}
            <div className="capa-emprestimo">   
                <img className="capa-livro-emprestimo" src={interrogacao} alt="" />
            </div>
            
{/*-==============================DATAS DE EMPRÉSTIMOS=============================- */}
            <div className="card-detalhes-emprestimo">
                <h1 className="titulo-card-emprestimo">Titulo</h1>

                <div className="card-data-emprestimo-pai">
                    
                    <div className="card-data-emprestimo">
                        <p className="titulo-data-emprestimo">Emprestado em</p>
                        <p className="texto-data-emprestimo">DATA AQUI</p>                        
                    </div>

                    <div className="card-data-emprestimo">
                        <p className="titulo-data-emprestimo">Devolvido em </p>
                        <p className="texto-data-emprestimo">DATA AQUI</p>
                    </div>
                </div>
            </div>
{/*==================================== Canto Direito do card==================== */}

            <div className="card-acoes-emprestimo">
                <button className="btn btn--primaria ">
                    Devolver
                </button>
                <p className="texto-dentro-prazo">Devolvido</p>
                <p className="texto-fora-prazo">No Prazo ° 11 Dias</p>
                <p className="texto-dentro-prazo">fora do prazo ° 2 dias</p>
            </div>

        </div>

    )
}