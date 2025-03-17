<?php

namespace App\Http\Requests\Operator\AcademicCalendar;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'year_academic' => ['required', 'string'],
            'image'         => ['sometimes', 'nullable', 'file', 'mimes:jpg,png']
        ];
    }
}
