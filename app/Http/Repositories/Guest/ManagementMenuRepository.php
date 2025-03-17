<?php

namespace App\Http\Repositories\Guest;

use App\Models\ManagementMenu;
use Illuminate\Database\Eloquent\Collection;

class ManagementMenuRepository
{
    public function getAll(): Collection
    {
        return ManagementMenu::get();
    }

    public function getByLocationMenu(string $locationMenu): Collection
    {
        return ManagementMenu::where('location_menu', $locationMenu)->get();
    }

    public function getBySlug(string $slug): ManagementMenu
    {
        return ManagementMenu::where('slug', $slug)->firstOrFail();
    }
}
