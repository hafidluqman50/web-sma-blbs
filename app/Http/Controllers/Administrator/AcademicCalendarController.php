<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\AcademicCalendar\IndexRequest;
use App\Http\Requests\Administrator\AcademicCalendar\StoreRequest;
use App\Http\Requests\Administrator\AcademicCalendar\UpdateRequest;
use App\Http\Services\Administrator\AcademicCalendarService;
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

        return Inertia::render('Administrator/AcademicCalendar/Main', compact('academic_calendars', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/AcademicCalendar/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->academicCalendarService->store($request);

        return redirect('administrator/academic-calendars')->with('success', 'Berhasil Input Data Guru!');
    }

    public function edit(AcademicCalendar $academicCalendar): Response
    {
        $academic_calendar = $this->academicCalendarService->getById($academicCalendar->id);

        return Inertia::render('Administrator/AcademicCalendar/Edit', compact('academic_calendar'));
    }

    public function update(AcademicCalendar $academicCalendar, UpdateRequest $request): RedirectResponse
    {
        $this->academicCalendarService->update($academicCalendar, $request);

        return redirect('administrator/academic-calendars')->with('success', 'Berhasil Update Data Guru');
    }

    public function delete(AcademicCalendar $academicCalendar): RedirectResponse
    {
        $this->academicCalendarService->delete($academicCalendar);

        return redirect('administrator/academic-calendars')->with('success', 'Berhasil Hapus Data Guru');
    }
}
