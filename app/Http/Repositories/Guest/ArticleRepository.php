<?php

namespace App\Http\Repositories\Guest;

use App\Models\Article;
use Illuminate\Support\Collection;

class ArticleRepository
{
    public function getAll(): Collection
    {
        return Article::with(['articleDetails', 'user'])->orderBy('date', 'DESC')->get();
    }

    public function show(string $slug): Article
    {
        return Article::with(['articleDetails', 'user'])->where('slug', $slug)->firstOrFail();
    }
}
