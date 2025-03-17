<?php

namespace App\Http\Repositories\Administrator;

use App\Http\Requests\Administrator\User\IndexRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository
{
    public function getAll(): Collection
    {
        return User::where('role_id', 2)->get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return User::when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('name', 'like', '%'.$request->search.'%');
        })->where('role_id', 2)->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): User
    {
        return User::where('id', $id)->firstOrFail();
    }

    public function store(array $data): User
    {
        return User::create($data);
    }

    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }
}
