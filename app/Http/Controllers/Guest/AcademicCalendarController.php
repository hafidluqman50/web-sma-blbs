<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\AcademicCalendarService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AcademicCalendarController extends Controller
{
    public function __construct(
        private AcademicCalendarService $academicCalendarService
    ){}

    public function index(): Response
    {
        [$academic_calendars, $page_num] = $this->academicCalendarService->getWithPagination();

        return Inertia::render('Guest/AcademicCalendar/Main', compact('academic_calendars', 'page_num'));
    }
}
