<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidaIsbn implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! preg_match('/^(97(8|9))?\d{9}(\d|X)$/', (string) $value)) {
            $fail('O :attribute informado não é um ISBN válido.');
        }
    }
}