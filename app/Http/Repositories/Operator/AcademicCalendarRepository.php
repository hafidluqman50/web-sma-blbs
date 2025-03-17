<?php

namespace App\Http\Repositories\Operator;

use App\Http\Requests\Operator\AcademicCalendar\IndexRequest;
use App\Models\AcademicCalendar;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class AcademicCalendarRepository
{
    public function getAll(): Collection
    {
        return AcademicCalendar::get();
    }

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return AcademicCalendar::when($request->filled('search'), function(Builder $query) use ($request) {
            return $query->where('year_academic', 'like', '%'.$request->search.'%');
        })->orderBy('created_at', 'DESC')->paginate(10)->onEachSide(1)->withQueryString();
    }

    public function getById(int $id): AcademicCalendar
    {
        return AcademicCalendar::where('id', $id)->firstOrFail();
    }

    public function store(array $data): AcademicCalendar
    {
        return AcademicCalendar::create($data);
    }

    public function update(AcademicCalendar $academicCalendar, array $data): bool
    {
        return $academicCalendar->update($data);
    }
}
