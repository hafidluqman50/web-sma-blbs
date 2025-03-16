<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\AcademicCalendarRepository;
use App\Http\Requests\Administrator\AcademicCalendar\IndexRequest;
use App\Http\Requests\Administrator\AcademicCalendar\StoreRequest;
use App\Http\Requests\Administrator\AcademicCalendar\UpdateRequest;
use App\Models\AcademicCalendar;
use Illuminate\Support\Collection;

class AcademicCalendarService
{
    public function __construct(
        private AcademicCalendarRepository $academicCalendarRepository
    ){}

    public function getAll(): Collection
    {
        return $this->academicCalendarRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $academicCalendars = $this->academicCalendarRepository->getWithPagination($request);
        return [
            $academicCalendars,
            ($academicCalendars->currentPage() - 1) * $academicCalendars->perPage() + 1
        ];
    }

    public function getById(int $id): AcademicCalendar
    {
        return $this->academicCalendarRepository->getById($id);
    }

    public function store(StoreRequest $request): AcademicCalendar
    {
        $urlImage = $request->image->storePubliclyAs(
            '/academic-calendars',
            time().'.'.$request->image->getClientOriginalExtension(),
            's3'
        );

        $data = [
            'year_academic' => $request->year_academic,
            'image'         => config('filesystems.disks.s3.url').$urlImage,
        ];

        return $this->academicCalendarRepository->store($data);
    }

    public function update(AcademicCalendar $academicCalendar, UpdateRequest $request): AcademicCalendar
    {
        $data = [
            'year_academic'     => $request->year_academic,
        ];

        if($request->hasFile('image')) {
            $urlImage = $request->image->storePubliclyAs(
                '/galleries',
                time().'.'.$request->image->getClientOriginalExtension(),
                's3'
            );

            $data['image'] = config('filesystems.disks.s3.url').$urlImage;
        }

        $this->academicCalendarRepository->update($academicCalendar, $data);

        return $academicCalendar;
    }

    public function delete(AcademicCalendar $academicCalendar): void
    {
        $academicCalendar->delete();
    }
}
