<?php

namespace App\Http\Repositories\Guest;

use App\Http\Requests\Guest\Teacher\IndexRequest;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TeacherRepository
{
    // public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    // {
    //     return Teacher::when($request->filled('search'), function(Builder $query) use ($request) {
    //                 $query->where('caption', 'like', '%'.$request->search.'%');
    //             })
    //             ->orderBy('date', 'DESC')
    //             ->paginate(10)
    //             ->onEachSide(1)
    //             ->withQueryString();
    // }

    public function getAll(): Collection
    {
        return Teacher::orderBy('created_at', 'DESC')->get();
    }

    public function getWithLimit(int $limit): Collection
    {
        return Teacher::limit($limit)->orderBy('created_at', 'DESC')->get();
    }
}
