<?php

namespace App\Http\Repositories\Administrator;

use App\Http\Requests\Administrator\Gallery\IndexRequest;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class GalleryRepository
{
    public function getAll(): Collection
    {
        return Gallery::with(['user'])->get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return Gallery::with(['user'])->when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('caption', 'like', '%'.$request->search.'%');
        })->orderBy('date', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): Gallery
    {
        return Gallery::with(['user'])->where('id', $id)->firstOrFail();
    }

    public function store(array $data): Gallery
    {
        return Gallery::create($data);
    }

    public function update(Gallery $gallery, array $data): bool
    {
        return $gallery->update($data);
    }
}
