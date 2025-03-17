<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\User\IndexRequest;
use App\Http\Requests\Administrator\User\StoreRequest;
use App\Http\Requests\Administrator\User\UpdateRequest;
use App\Http\Services\Administrator\UserService;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService
    ){}

    public function index(IndexRequest $request): Response
    {
        [$users, $page_num] = $this->userService->getWithPagination($request);

        return Inertia::render('Administrator/User/Main', compact('users', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/User/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->userService->store($request);

        return redirect('administrator/users')->with('success', 'Berhasil Input Data Operator!');
    }

    public function edit(User $user): Response
    {
        $user = $this->userService->getById($user->id);

        return Inertia::render('Administrator/User/Edit', compact('user'));
    }

    public function update(User $user, UpdateRequest $request): RedirectResponse
    {
        $this->userService->update($user, $request);

        return redirect('administrator/users')->with('success', 'Berhasil Update Data Operator');
    }

    public function delete(User $user): RedirectResponse
    {
        $this->userService->delete($user);

        return redirect('administrator/users')->with('success', 'Berhasil Hapus Data Operator');
    }
}
