<?php

namespace App\Http\Services\Guest;

use App\Http\Repositories\Guest\GalleryRepository;
use App\Http\Requests\Guest\Gallery\IndexRequest;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class GalleryService
{
    public function __construct(
        private GalleryRepository $galleryRepository
    ){}

    public function getWithPagination(IndexRequest $request): LengthAwarePaginator
    {
        return $this->galleryRepository->getWithPagination($request);
    }

    public function getAll(): Collection
    {
        return $this->galleryRepository->getAll();
    }

    public function getWithLimit(int $limit): Collection
    {
        return $this->galleryRepository->getWithLimit($limit);
    }

    public function show(string $slug): Gallery
    {
        return $this->galleryRepository->show($slug);
    }
}
