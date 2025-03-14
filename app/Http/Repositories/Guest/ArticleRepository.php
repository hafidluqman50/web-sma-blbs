<?php

namespace App\Http\Repositories\Guest;

use App\Http\Requests\Guest\Article\IndexRequest;
use App\Models\Article;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;

class ArticleRepository
{

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return Article::with(['articleDetails', 'user'])
               ->when($request->filled('search'), function(Builder $query) use ($request) {
                   $query->where('title', 'like', '%'.$request->search.'%');
               })
               ->orderBy('created_at', 'DESC')
               ->paginate(10)
               ->onEachSide(1)
               ->withQueryString();
    }

    public function getAll(): Collection
    {
        return Article::with(['articleDetails', 'user'])->orderBy('date', 'DESC')->get();
    }

    public function show(string $slug): Article
    {
        return Article::with(['articleDetails', 'user'])->where('slug', $slug)->firstOrFail();
    }
}
