<?php

namespace App\Http\Repositories\Guest;

use App\Http\Requests\Guest\Gallery\IndexRequest;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class GalleryRepository
{
    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return Gallery::with(['user'])
                ->when($request->filled('search'), function(Builder $query) use ($request) {
                    $query->where('caption', 'like', '%'.$request->search.'%');
                })
                ->orderBy('date', 'DESC')
                ->paginate(10)
                ->onEachSide(1)
                ->withQueryString();
    }

    public function getAll(): Collection
    {
        return Gallery::with(['user'])->orderBy('date', 'DESC')->get();
    }

    public function getWithLimit(int $limit): Collection
    {
        return Gallery::with(['user'])->limit($limit)->orderBy('date', 'DESC')->get();
    }

    public function show(string $slug): Gallery
    {
        return Gallery::with(['user'])->where('slug', $slug)->firstOrFail();
    }
}
