<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';
    protected $primaryKey = 'log_id';

    protected $fillable = [
        'usuario_id', 'valor_anterior', 'valor_posterior', 'acao'
    ];

    public function usuario(){
        return $this->belongsTo(Usuario::class, 'usuario_id', 'usuario_id');
    }
}
