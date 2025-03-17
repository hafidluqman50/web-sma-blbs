<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\UserRepository;
use App\Http\Requests\Administrator\User\IndexRequest;
use App\Http\Requests\Administrator\User\StoreRequest;
use App\Http\Requests\Administrator\User\UpdateRequest;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    public function __construct(
        private UserRepository $userRepository
    ){}

    public function getAll(): Collection
    {
        return $this->userRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $users = $this->userRepository->getWithPagination($request);
        return [
            $users,
            ($users->currentPage() - 1) * $users->perPage() + 1
        ];
    }

    public function getById(int $id): User
    {
        return $this->userRepository->getById($id);
    }

    public function store(StoreRequest $request): User
    {
        $data = [
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'role_id'       => 2,
        ];

        return $this->userRepository->store($data);
    }

    public function update(User $user, UpdateRequest $request): User
    {

        $data = [
            'name'          => $request->name,
            'email'         => $request->email,
        ];

        if($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $this->userRepository->update($user, $data);

        return $user;
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
