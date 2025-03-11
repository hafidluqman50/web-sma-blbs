<?php

namespace App\Http\Repositories\Administrator;

use App\Models\CategoryArticle;
use Illuminate\Support\Collection;

class CategoryArticleRepository
{
    public function getAll(): Collection
    {
        return CategoryArticle::all();
    }
}
