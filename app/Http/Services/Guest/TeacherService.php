<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\TeacherRepository;
use Illuminate\Database\Eloquent\Collection;

class TeacherService
{
    public function __construct(
        private TeacherRepository $teacherRepository
    ){}

    public function getAll(): Collection
    {
        return $this->teacherRepository->getAll();
    }
}
