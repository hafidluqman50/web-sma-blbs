<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\ManagementMenuRepository;
use App\Http\Requests\Administrator\ManagementMenu\IndexRequest;
use App\Http\Requests\Administrator\ManagementMenu\StoreRequest;
use App\Http\Requests\Administrator\ManagementMenu\UpdateRequest;
use App\Models\ManagementMenu;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ManagementMenuService
{
    public function __construct(
        private ManagementMenuRepository $managementMenuRepository
    ){}

    public function getAll(): Collection
    {
        return $this->managementMenuRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $managementMenus = $this->managementMenuRepository->getWithPagination($request);
        return [
            $managementMenus,
            ($managementMenus->currentPage() - 1) * $managementMenus->perPage() + 1
        ];
    }

    public function getById(int $id): ManagementMenu
    {
        return $this->managementMenuRepository->getById($id);
    }

    public function store(StoreRequest $request): ManagementMenu
    {
        $data = [
            'name'          => $request->name,
            'slug'          => Str::slug($request->name, '-'),
            'content'       => $request->content,
            'location_menu' => $request->location_menu
        ];

        return $this->managementMenuRepository->store($data);
    }

    public function update(ManagementMenu $managementMenu, UpdateRequest $request): ManagementMenu
    {

        $data = [
            'name'          => $request->name,
            'slug'          => Str::slug($request->name, '-'),
            'content'       => $request->content,
            'location_menu' => $request->location_menu
        ];

        $this->managementMenuRepository->update($managementMenu, $data);

        return $managementMenu;
    }

    public function delete(ManagementMenu $managementMenu): void
    {
        $managementMenu->delete();
    }
}
