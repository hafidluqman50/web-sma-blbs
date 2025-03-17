<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\ManagementMenuRepository;
use App\Http\Transformers\ManagementMenuTransformer;
use App\Models\ManagementMenu;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;

class ManagementMenuService
{
    public function __construct(
        private ManagementMenuRepository $managementMenuRepository
    ){}

    public function getAll(): Collection
    {
        return $this->managementMenuRepository->getAll();
    }

    public function getByLocationMenu(string $locationMenu): Collection
    {
        return $this->managementMenuRepository->getByLocationMenu($locationMenu)->map(function(ManagementMenu $map) {
            return App::make(ManagementMenuTransformer::class)->transform($map);
        });
    }

    public function getBySlug(string $slug): ManagementMenu
    {
        return $this->managementMenuRepository->getBySlug($slug);
    }
}
