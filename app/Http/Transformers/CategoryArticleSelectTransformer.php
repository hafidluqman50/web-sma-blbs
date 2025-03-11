<?php

namespace App\Http\Transformers;

use App\Models\CategoryArticle;

class CategoryArticleSelectTransformer
{
    public function transform(CategoryArticle $categoryArticle): array
    {
        return [
            'value' => $categoryArticle->id,
            'label' => $categoryArticle->name
        ];
    }
}
