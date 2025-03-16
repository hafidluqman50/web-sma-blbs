<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\AcademicCalendarRepository;
use App\Models\AcademicCalendar;
use Illuminate\Database\Eloquent\Collection;

class AcademicCalendarService
{
    public function __construct(
        private AcademicCalendarRepository $academicCalendarRepository
    ){}

    public function getAll(): Collection
    {
        return $this->academicCalendarRepository->getAll();
    }

    public function getFirst(): ?AcademicCalendar
    {
        return $this->academicCalendarRepository->getFirst();
    }

    public function getWithPagination(): array
    {
        $academic_calendars = $this->academicCalendarRepository->getWithPagination();
        return [
            $academic_calendars,
            ($academic_calendars->currentPage() - 1) * $academic_calendars->perPage() + 1
        ];
    }
}
