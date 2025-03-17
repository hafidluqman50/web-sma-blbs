<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\ManagementMenu\IndexRequest;
use App\Http\Requests\Administrator\ManagementMenu\StoreRequest;
use App\Http\Requests\Administrator\ManagementMenu\UpdateRequest;
use App\Http\Services\Administrator\ManagementMenuService;
use App\Models\ManagementMenu;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ManagementMenuController extends Controller
{
    public function __construct(
        private ManagementMenuService $managementMenuService,
    ){}

    public function index(IndexRequest $request): Response
    {
        [$management_menus, $page_num] = $this->managementMenuService->getWithPagination($request);

        return Inertia::render('Administrator/ManagementMenu/Main', compact('management_menus', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/ManagementMenu/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->managementMenuService->store($request);

        return redirect('administrator/management-menus')->with('success', 'Berhasil Input Data Menu!');
    }

    public function edit(ManagementMenu $managementMenu): Response
    {
        $management_menu = $this->managementMenuService->getById($managementMenu->id);

        return Inertia::render('Administrator/ManagementMenu/Edit', compact('management_menu'));
    }

    public function update(ManagementMenu $managementMenu, UpdateRequest $request): RedirectResponse
    {
        $this->managementMenuService->update($managementMenu, $request);

        return redirect('administrator/management-menus')->with('success', 'Berhasil Update Data Menu');
    }

    public function delete(ManagementMenu $managementMenu): RedirectResponse
    {
        $this->managementMenuService->delete($managementMenu);

        return redirect('administrator/management-menus')->with('success', 'Berhasil Hapus Data Menu');
    }
}
