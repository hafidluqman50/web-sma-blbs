<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\AcademicCalendar\IndexRequest;
use App\Http\Requests\Operator\AcademicCalendar\StoreRequest;
use App\Http\Requests\Operator\AcademicCalendar\UpdateRequest;
use App\Http\Services\Operator\AcademicCalendarService;
use App\Models\AcademicCalendar;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AcademicCalendarController extends Controller
{
    public function __construct(
        private AcademicCalendarService $academicCalendarService,
    ){}

    public function index(IndexRequest $request): Response
    {
        [$academic_calendars, $page_num] = $this->academicCalendarService->getWithPagination($request);

        return Inertia::render('Operator/AcademicCalendar/Main', compact('academic_calendars', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Operator/AcademicCalendar/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->academicCalendarService->store($request);

        return redirect('operator/academic-calendars')->with('success', 'Berhasil Input Data Guru!');
    }

    public function edit(AcademicCalendar $academicCalendar): Response
    {
        $academic_calendar = $this->academicCalendarService->getById($academicCalendar->id);

        return Inertia::render('Operator/AcademicCalendar/Edit', compact('academic_calendar'));
    }

    public function update(AcademicCalendar $academicCalendar, UpdateRequest $request): RedirectResponse
    {
        $this->academicCalendarService->update($academicCalendar, $request);

        return redirect('operator/academic-calendars')->with('success', 'Berhasil Update Data Guru');
    }

    public function delete(AcademicCalendar $academicCalendar): RedirectResponse
    {
        $this->academicCalendarService->delete($academicCalendar);

        return redirect('operator/academic-calendars')->with('success', 'Berhasil Hapus Data Guru');
    }
}
