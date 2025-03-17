<?php

namespace App\Http\Repositories\Administrator;

use App\Http\Requests\Administrator\ManagementMenu\IndexRequest;
use App\Models\ManagementMenu;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ManagementMenuRepository
{
    public function getAll(): Collection
    {
        return ManagementMenu::get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return ManagementMenu::when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('name', 'like', '%'.$request->search.'%');
        })->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): ManagementMenu
    {
        return ManagementMenu::where('id', $id)->firstOrFail();
    }

    public function store(array $data): ManagementMenu
    {
        return ManagementMenu::create($data);
    }

    public function update(ManagementMenu $managementMenu, array $data): bool
    {
        return $managementMenu->update($data);
    }
}
