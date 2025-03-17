<?php

namespace App\Http\Repositories\Operator;

use App\Http\Requests\Operator\CategoryArticle\IndexRequest;
use App\Models\CategoryArticle;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class CategoryArticleRepository
{
    public function getAll(): Collection
    {
        return CategoryArticle::all();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return CategoryArticle::when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('name', 'like', '%'.$request->search.'%');
        })->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function store(array $data): CategoryArticle
    {
        return CategoryArticle::create($data);
    }

    public function update(CategoryArticle $categoryArticle, array $data): bool
    {
        return $categoryArticle->update($data);
    }

    public function delete(CategoryArticle $categoryArticle): bool
    {
        return $categoryArticle->delete();
    }
}
