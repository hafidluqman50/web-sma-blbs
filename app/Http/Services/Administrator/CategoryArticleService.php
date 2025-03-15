<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\CategoryArticleRepository;
use App\Http\Requests\Administrator\CategoryArticle\IndexRequest;
use App\Http\Requests\Administrator\CategoryArticle\StoreRequest;
use App\Http\Requests\Administrator\CategoryArticle\UpdateRequest;
use App\Models\CategoryArticle;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class CategoryArticleService
{
    public function __construct(
        private CategoryArticleRepository $categoryArticleRepository
    ){}

    public function getAll(): Collection
    {
        return $this->categoryArticleRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $category_articles = $this->categoryArticleRepository->getWithPagination($request);

        return [
            $category_articles,
            ($category_articles->currentPage() - 1) * $category_articles->perPage() + 1
        ];
    }

    public function store(StoreRequest $request): CategoryArticle
    {
        $data = ['name' => $request->name, 'slug_name' => Str::slug($request->name, '-')];

        return $this->categoryArticleRepository->store($data);
    }

    public function update(CategoryArticle $categoryArticle, UpdateRequest $request): CategoryArticle
    {
        $data = ['name' => $request->name, 'slug_name' => Str::slug($request->name, '-')];

        $this->categoryArticleRepository->update($categoryArticle, $data);

        return $categoryArticle;
    }

    public function delete(CategoryArticle $categoryArticle): void
    {
        $this->categoryArticleRepository->delete($categoryArticle);
    }
}
