import { useState } from 'react'
import { X, Search, Calendar, BookOpen, Link as LinkIcon, Ellipsis } from 'lucide-react'
import api from '../api/client'
import axios from "axios";
import '../styles/Modal.css'
import '../styles/TelaAdicionarLivros.css'

export default function ModalAdicionarLivro({ onClose, onSalvar }) {

    const [form, setForm] = useState({});
    const [buscandoIsbn, setBuscandoIsbn] = useState(false);
    const [erro, setErro] = useState(null);
    const [capaErro, setCapaErro] = useState(false);
    const [salvando, setSalvando] = useState(false);

    async function buscaIsbn(){
        if (!form.isbn) return;

        let livroSinopse = form.sinopse;
        let autorNome = form.autor;
        let autorBio = null;
        let livroGenero = form.genero;

        try{
            setBuscandoIsbn(true);
            const { data: dadosLivro }  = await axios.get(`https://openlibrary.org/isbn/${form.isbn}.json`);

            if( dadosLivro?.authors?.[0]?.key ){
                try{
                   const { data: dadosAutor } = await axios.get(`https://openlibrary.org${dadosLivro?.authors[0]?.key}.json`);
                    autorNome = dadosAutor?.name;
                }
                catch(err){
                    console.error(err);
                }
            }

            if(dadosLivro?.works?.[0]?.key){
                try{
                    const { data: dadosWork } = await axios.get(`https://openlibrary.org${dadosLivro.works[0].key}.json`);

                    if(dadosWork?.description?.value){
                        livroSinopse = dadosWork?.description?.value; 
                    } else livroSinopse = dadosWork?.description;

                    console.log(dadosWork.genres);
                    console.log(dadosWork.subjects);
                    if(dadosWork?.genres){
                        try{
                            const { data: dadosTag } = await axios.get(`https://openlibrary.org${dadosWork?.genres[0]}.json`);
                            livroGenero = dadosTag?.name;
                        } catch(err){
                            console.error(err)
                        }
                    } else livroGenero = dadosWork?.subjects[0];
                } catch(err) {

                }

            }
            
            setForm((f) => ({
                ...f,
                titulo: dadosLivro.title ?? f.titulo,
                autor: autorNome,
                capa: `https://covers.openlibrary.org/b/isbn/${form.isbn}-M.jpg` ?? f.capa,
                sinopse: livroSinopse,
                genero: livroGenero,
                ano_publicacao: dadosLivro.publish_date ? dadosLivro.publish_date.slice(-4) : f.ano_publicacao,
                autor_bio: autorBio,
            }));

        } catch(err) {
            console.error(err)
        } finally {
            setBuscandoIsbn(false); 
        }
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        setErro(null);
        setSalvando(true);
        try{
            await api.post('/livros', form);
            onSalvar();
            onClose(); 
        } catch(err){
            setErro(err.response?.data?.message ?? "Não foi possível adicionar o livro")
        }
        finally{
            setSalvando(false);
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    return (
        <div className='modal-overlay' onClick={onClose}>
            <form
                className='modal-conteudo modal-add'
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
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
                                    name='isbn'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o ISBN'
                                    value={form.isbn}
                                    onChange={handleChange}
                                    required
                                />
                                <button type='button' className='form-botao-icone' onClick={buscaIsbn}>
                                    {buscandoIsbn ? (<Ellipsis size={18}/>) : (<Search size={18} />)}
                                </button>
                            </div>
                        </div>

                        <div className='form-duas-colunas'>
                            <div className='form-campo'>
                                <label htmlFor='titulo'>Título</label>
                                <input
                                    id='titulo'
                                    name='titulo'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o título do livro'
                                    value={form.titulo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className='form-campo'>
                                <label htmlFor='autor'>Autor</label>
                                <input
                                    id='autor'
                                    name='autor'
                                    className='form-input'
                                    type='text'
                                    placeholder='Nome do autor'
                                    value={form.autor}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-duas-colunas'>
                            <div className='form-campo'>
                                <label htmlFor='genero'>Gênero</label>
                                <input
                                    id='genero'
                                    name='genero'
                                    className='form-input'
                                    type='text'
                                    placeholder='Digite o gênero'
                                    value={form.genero}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-campo'>
                                <label htmlFor='ano'>Ano de publicação</label>
                                <div className='input-wrapper'>
                                    <input
                                        id='ano'
                                        name='ano_publicacao'
                                        className='form-input'
                                        type='text'
                                        placeholder='Digite o ano'
                                        value={form.ano_publicacao}
                                        onChange={handleChange}
                                    />
                                    <Calendar size={18} className='form-icone-direita' />
                                </div>
                            </div>
                        </div>

                        <div className='form-campo'>
                            <label htmlFor='sinopse'>Sinopse</label>
                            <textarea
                                id='sinopse'
                                name='sinopse'
                                className='form-input form-textarea'
                                placeholder='Texto...'
                                value={form.sinopse}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='modal-add__capa'>
                        <p className='modal-add__capa-titulo'>Capa do livro</p>

                        <div className='capa-preview'>
                            {form.capa && !capaErro ? (
                                <img
                                    src={form.capa}
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
                                    name='capa'
                                    className='form-input'
                                    type='url'
                                    placeholder='https://...'
                                    value={form.capa}
                                    onChange={handleChange}
                                />
                                <LinkIcon size={18} className='form-icone-direita' />
                            </div>
                        </div>
                    </div>

                </div>

                <div className='modal-add__linha' />

                <div className='modal-add__rodape'>
                    {erro && <p style={{ color: 'red' }}>{erro}</p>}

                    <button type='submit' className='btn btn--primaria' disabled={salvando}>
                        {salvando ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>

            </form>
        </div>
    )

}