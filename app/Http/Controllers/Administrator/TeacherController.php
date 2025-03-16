<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Teacher\IndexRequest;
use App\Http\Requests\Administrator\Teacher\StoreRequest;
use App\Http\Requests\Administrator\Teacher\UpdateRequest;
use App\Http\Services\Administrator\TeacherService;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function __construct(
        private TeacherService $teacherService,
    ){}

    public function index(IndexRequest $request): Response
    {
        [$teachers, $page_num] = $this->teacherService->getWithPagination($request);

        return Inertia::render('Administrator/Teacher/Main', compact('teachers', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/Teacher/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->teacherService->store($request);

        return redirect('administrator/teachers')->with('success', 'Berhasil Input Data Guru!');
    }

    public function edit(Teacher $teacher): Response
    {
        $teacher = $this->teacherService->getById($teacher->id);

        return Inertia::render('Administrator/Teacher/Edit', compact('teacher'));
    }

    public function update(Teacher $teacher, UpdateRequest $request): RedirectResponse
    {
        $this->teacherService->update($teacher, $request);

        return redirect('administrator/teachers')->with('success', 'Berhasil Update Data Guru');
    }

    public function delete(Teacher $teacher): RedirectResponse
    {
        $this->teacherService->delete($teacher);

        return redirect('administrator/teachers')->with('success', 'Berhasil Hapus Data Guru');
    }
}
