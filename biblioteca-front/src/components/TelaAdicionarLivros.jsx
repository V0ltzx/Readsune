import { useState } from 'react'
import { X, Search, Calendar, BookOpen, Link as LinkIcon } from 'lucide-react'
import api from '../api/client'
import '../styles/Modal.css'
import '../styles/TelaAdicionarLivros.css'

export default function ModalAdicionarLivro({ onClose, onSalvar }) {

    const [isbn, setIsbn] = useState('')
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('')
    const [sinopse, setSinopse] = useState('')
    const [capa, setCapa] = useState('')
    const [capaErro, setCapaErro] = useState(false)
    const [salvando, setSalvando] = useState(false)

    async function Salvar(e) {
        e.preventDefault()

        const obj = {
            titulo,
            isbn,
            autor_nome: autor,
            genero: genero || null,
            ano_publicacao: ano ? Number(ano) : null,
            sinopse: sinopse || null,
            capa: capa || null,
        }

        try {
            setSalvando(true)
            await api.post('/livros', obj)
            onSalvar()
            onClose()

        } catch (err) {
            alert(err.response?.data?.message ?? 'Não foi possível registrar o livro.')

        } finally {
            setSalvando(false)

        }
    }

    return (
        <div className='modal-overlay' onClick={onClose}>
            <form
                className='modal-conteudo modal-add'
                onClick={(e) => e.stopPropagation()}
                onSubmit={Salvar}
            >

                <div className='modal-add__topo'>
                    <h2 className='modal-add__titulo'>Adicionar livro</h2>
                    <button type='button' className='modal-add__fechar' onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                <div className='modal-add__corpo'>
                    <div className='modal-add__campos'>
                        <div className='form-campo'>
                            <label htmlFor='isbn'>ISBN</label>
                            <div className='form-linha'>
                                <input
                                    id='isbn'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o ISBN'
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    required
                                />
                                <button type='button' className='form-botao-icone'>
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        <div className='form-duas-colunas'>
                            <div className='form-campo'>
                                <label htmlFor='titulo'>Título</label>
                                <input
                                    id='titulo'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o título do livro'
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='form-campo'>
                                <label htmlFor='autor'>Autor</label>
                                <input
                                    id='autor'
                                    className='form-input'
                                    type='text'
                                    placeholder='Nome do autor'
                                    value={autor}
                                    onChange={(e) => setAutor(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-duas-colunas'>
                            <div className='form-campo'>
                                <label htmlFor='genero'>Gênero</label>
                                <input
                                    id='genero'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o gênero'
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                />
                            </div>

                            <div className='form-campo'>
                                <label htmlFor='ano'>Ano de publicação</label>
                                <div className='input-wrapper'>
                                    <input
                                        id='ano'
                                        className='form-input'
                                        type='text'
                                        placeholder='Digite o ano'
                                        value={ano}
                                        onChange={(e) => setAno(e.target.value)}
                                    />
                                    <Calendar size={18} className='form-icone-direita' />
                                </div>
                            </div>
                        </div>

                        <div className='form-campo'>
                            <label htmlFor='sinopse'>Sinopse</label>
                            <textarea
                                id='sinopse'
                                className='form-input form-textarea'
                                placeholder='Texto...'
                                value={sinopse}
                                onChange={(e) => setSinopse(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className='modal-add__capa'>
                        <p className='modal-add__capa-titulo'>Capa do livro</p>

                        <div className='capa-preview'>
                            {capa && !capaErro ? (
                                <img
                                    src={capa}
                                    alt='Prévia da capa'
                                    onError={() => setCapaErro(true)}
                                />
                            ) : (
                                <div className='capa-preview__vazia'>
                                    <BookOpen size={90} />
                                    <p>Capa não definida</p>
                                </div>
                            )}
                        </div>

                        <div className='form-campo'>
                            <label htmlFor='capa'>URL da capa</label>
                            <div className='input-wrapper'>
                                <input
                                    id='capa'
                                    className='form-input'
                                    type='url'
                                    placeholder='https://...'
                                    value={capa}
                                    onChange={(e) => { setCapa(e.target.value); setCapaErro(false) }}
                                />
                                <LinkIcon size={18} className='form-icone-direita' />
                            </div>
                        </div>
                    </div>

                </div>

                <div className='modal-add__linha' />

                <div className='modal-add__rodape'>
                    <button type='submit' className='btn btn--primaria' disabled={salvando}>
                        {salvando ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>

            </form>
        </div>
    )

}