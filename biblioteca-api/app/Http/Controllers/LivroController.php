<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLivroRequest;
use App\Http\Requests\UpdateLivroRequest;
use App\Models\Livro;
use App\Models\Autor;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LivroController extends Controller
{
    public function index(Request $request)
    {
        $query = Livro::with(['autor', 'emprestado']);

        if ($busca = $request->query('busca')) {
            $query->where('titulo', 'like', "%{$busca}%");
        }

        if ($genero = $request->query('genero')) {
            $query->where('genero', $genero);
        }

        $query->orderBy($request->query('ordenar', 'titulo'));

        return $query->paginate(15);
    }

    public function store(StoreLivroRequest $request)
    {
        $livroDados = $request->validated();

        $autor = Autor::firstOrCreate(
            ['nome' => $livroDados['autor']],
            ['biografia' => $livroDados['autor_bio'] ?? null] 
        );

        unset($livroDados['autor'], $livroDados['autor_bio']);

        $livro = Livro::create([
            ...$livroDados,
            'autor_id' => $autor->autor_id
        ]);

        Log::create([
            'usuario_id'        => $request->user()->usuario_id,
            'acao'           => 'Criou livro',
            'valor_posterior'=> $livro->titulo,
        ]);

        return response()->json($livro, 201);
    }

    public function show(Livro $livro)
    {
        return $livro->load('autor', 'emprestimos');
    }

    public function update(UpdateLivroRequest $request, Livro $livro)
    {
        $livro->update($request->validated());

        Log::create([
            'usuario_id'        => $request->user()->usuario_id,
            'acao'           => 'Atualizou livro',
            'valor_posterior'=> $request->titulo,
            'valor_anterior' => $livro->titulo,
        ]);

        return $livro;
    }

    public function destroy(Livro $livro)
    {
        Log::create([
            'usuario_id'        => request()->user()->usuario_id,
            'acao'           => 'Excluiu livro',
            'valor_anterior' => $livro->titulo,
        ]);

        $livro->delete();

        return response()->json(['Livro' => $livro, 'mensagem' => 'Livro removido com sucesso.'], 204);
    }
}