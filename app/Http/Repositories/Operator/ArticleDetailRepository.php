<?php

namespace App\Http\Repositories\Operator;

use App\Models\ArticleDetail;

class ArticleDetailRepository
{
    public function store(array $data): ArticleDetail
    {
        return ArticleDetail::create($data);
    }

    public function deleteByArticleId(int $articleId): bool
    {
        return ArticleDetail::where('article_id', $articleId)->delete();
    }
}
