<?php

namespace App\Http\Requests;

use App\Rules\ValidaIsbn;
use Illuminate\Foundation\Http\FormRequest;

class StoreLivroRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->bibliotecario() ?? false;
    }

    public function rules(): array
    {
        return [
            'titulo'         => ['required', 'string', 'max:100'],
            'isbn'           => ['required', 'unique:livros,isbn', new ValidaIsbn()],
            'capa'           => ['nullable', 'string', 'max:300'],
            'sinopse'        => ['nullable', 'string'],
            'genero'         => ['nullable', 'string', 'max:45'],
            'ano_publicacao' => ['nullable', 'integer', 'digits:4'],
            'autor'          => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'isbn.unique'      => 'Já existe um livro cadastrado com esse ISBN.',
        ];
    }
}
