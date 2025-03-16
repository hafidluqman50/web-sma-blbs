<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\TeacherRepository;
use App\Http\Requests\Administrator\Teacher\IndexRequest;
use App\Http\Requests\Administrator\Teacher\StoreRequest;
use App\Http\Requests\Administrator\Teacher\UpdateRequest;
use App\Models\Teacher;
use Illuminate\Support\Collection;

class TeacherService
{
    public function __construct(
        private TeacherRepository $teacherRepository
    ){}

    public function getAll(): Collection
    {
        return $this->teacherRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $teachers = $this->teacherRepository->getWithPagination($request);
        return [
            $teachers,
            ($teachers->currentPage() - 1) * $teachers->perPage() + 1
        ];
    }

    public function getById(int $id): Teacher
    {
        return $this->teacherRepository->getById($id);
    }

    public function store(StoreRequest $request): Teacher
    {
        $urlImage = $request->image->storePubliclyAs(
            '/teachers',
            time().'.'.$request->image->getClientOriginalExtension(),
            's3'
        );

        $data = [
            'name'     => $request->name,
            'position' => $request->position,
            'image'    => config('filesystems.disks.s3.url').$urlImage,
        ];

        return $this->teacherRepository->store($data);
    }

    public function update(Teacher $teacher, UpdateRequest $request): Teacher
    {
        $data = [
            'name'     => $request->name,
            'position' => $request->position,
        ];

        if($request->hasFile('image')) {
            $urlImage = $request->image->storePubliclyAs(
                '/galleries',
                time().'.'.$request->image->getClientOriginalExtension(),
                's3'
            );

            $data['image'] = config('filesystems.disks.s3.url').$urlImage;
        }

        $this->teacherRepository->update($teacher, $data);

        return $teacher;
    }

    public function delete(Teacher $teacher): void
    {
        $teacher->delete();
    }
}
