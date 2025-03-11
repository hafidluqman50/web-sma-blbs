<?php

namespace App\Http\Requests\Administrator\Article;

use App\Models\CategoryArticle;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'title'               => ['required', 'string'],
            'date'                => ['required', 'string', 'date_format:Y-m-d'],
            'content'             => ['required', 'string'],
            'image'               => ['required', 'file', 'mimes:jpg,png'],
            'category_articles'   => ['required', 'array'],
            'category_articles.*' => ['required', 'integer', 'exists:'.CategoryArticle::class.',id']
        ];
    }
}
