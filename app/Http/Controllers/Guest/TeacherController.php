<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\TeacherService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function __construct(
        private TeacherService $teacherService
    ){}

    public function index(): Response
    {
        $teachers = $this->teacherService->getAll();

        return Inertia::render('Guest/Teacher/Main', compact('teachers'));
    }
}
