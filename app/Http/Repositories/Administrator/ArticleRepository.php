<?php

namespace App\Http\Repositories\Administrator;

use App\Http\Requests\Administrator\Article\IndexRequest;
use App\Models\Article;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleRepository
{
    public function getAll(): Collection
    {
        return Article::with(['articleDetails', 'user'])->get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return Article::with(['articleDetails', 'user'])->when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('title', 'like', '%'.$request->search.'%');
        })->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): Article
    {
        return Article::with(['articleDetails', 'user'])->where('id', $id)->firstOrFail();
    }

    public function store(array $data): Article
    {
        return Article::create($data);
    }

    public function update(Article $article, array $data): bool
    {
        return $article->update($data);
    }
}
