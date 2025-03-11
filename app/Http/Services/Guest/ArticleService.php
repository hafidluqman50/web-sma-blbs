<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\ArticleRepository;
use App\Models\Article;
use Illuminate\Support\Collection;

class ArticleService
{
    public function __construct(
        private ArticleRepository $articleRepository
    ){}

    public function getAll(): Collection
    {
        return $this->articleRepository->getAll();
    }

    public function show(string $slug): Article
    {
        return $this->articleRepository->show($slug);
    }
}
