<?php

namespace App\Http\Repositories\Administrator;

use App\Models\ArticleDetail;

class ArticleDetailRepository
{
    public function store(array $data): ArticleDetail
    {
        return ArticleDetail::create($data);
    }
}
