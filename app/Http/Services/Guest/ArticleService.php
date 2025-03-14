<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\ArticleRepository;
use App\Http\Requests\Guest\Article\IndexRequest;
use App\Models\Article;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ArticleService
{
    public function __construct(
        private ArticleRepository $articleRepository
    ){}

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return $this->articleRepository->getWithPagination($request);
    }

    public function getAll(): Collection
    {
        return $this->articleRepository->getAll();
    }

    public function show(string $slug): Article
    {
        return $this->articleRepository->show($slug);
    }
}
