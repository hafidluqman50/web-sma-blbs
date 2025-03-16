<?php

namespace App\Http\Repositories\Administrator;

use App\Http\Requests\Administrator\Teacher\IndexRequest;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TeacherRepository
{
    public function getAll(): Collection
    {
        return Teacher::get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return Teacher::when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('name', 'like', '%'.$request->search.'%');
        })->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): Teacher
    {
        return Teacher::where('id', $id)->firstOrFail();
    }

    public function store(array $data): Teacher
    {
        return Teacher::create($data);
    }

    public function update(Teacher $teacher, array $data): bool
    {
        return $teacher->update($data);
    }
}
