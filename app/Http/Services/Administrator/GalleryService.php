<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\GalleryRepository;
use App\Http\Requests\Administrator\Gallery\IndexRequest;
use App\Http\Requests\Administrator\Gallery\StoreRequest;
use App\Http\Requests\Administrator\Gallery\UpdateRequest;
use App\Models\Gallery;
use Illuminate\Support\Collection;

class GalleryService
{
    public function __construct(
        private GalleryRepository $galleryRepository
    ){}

    public function getAll(): Collection
    {
        return $this->galleryRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $galleries = $this->galleryRepository->getWithPagination($request);
        return [
            $galleries,
            ($galleries->currentPage() - 1) * $galleries->perPage() + 1
        ];
    }

    public function getById(int $id): Gallery
    {
        return $this->galleryRepository->getById($id);
    }

    public function store(StoreRequest $request): Gallery
    {
        $urlImage = $request->image->storePubliclyAs(
            '/galleries',
            time().'.'.$request->image->getClientOriginalExtension(),
            's3'
        );

        $data = [
            'date'    => $request->date,
            'caption' => $request->caption,
            'image'   => config('filesystems.disks.s3.url').$urlImage,
            'user_id' => 1
        ];

        return $this->galleryRepository->store($data);
    }

    public function update(Gallery $gallery, UpdateRequest $request): Gallery
    {
        $data = [
            'date'    => $request->date,
            'caption' => $request->caption,
        ];

        if($request->hasFile('image')) {
            $urlImage = $request->image->storePubliclyAs(
                '/galleries',
                time().'.'.$request->image->getClientOriginalExtension(),
                's3'
            );

            $data['image'] = config('filesystems.disks.s3.url').$urlImage;
        }

        $this->galleryRepository->update($gallery, $data);

        return $gallery;
    }

    public function delete(Gallery $gallery): void
    {
        $gallery->delete();
    }
}
