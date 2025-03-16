<?php

namespace App\Http\Repositories\Guest;

use App\Models\AcademicCalendar;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class AcademicCalendarRepository
{
    public function getAll(): Collection
    {
        return AcademicCalendar::all();
    }

    public function getWithPagination(): LengthAwarePaginator
    {
        return AcademicCalendar::orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }
}
