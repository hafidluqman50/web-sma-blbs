<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Gallery\IndexRequest;
use App\Http\Requests\Administrator\Gallery\StoreRequest;
use App\Http\Requests\Administrator\Gallery\UpdateRequest;
use App\Http\Services\Administrator\GalleryService;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        private GalleryService $galleryService,
    ){}

    public function index(IndexRequest $request): Response
    {
        [$galleries, $page_num] = $this->galleryService->getWithPagination($request);

        return Inertia::render('Administrator/Gallery/Main', compact('galleries', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/Gallery/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->galleryService->store($request);

        return redirect('administrator/galleries')->with('success', 'Berhasil Input Galeri!');
    }

    public function edit(Gallery $gallery): Response
    {
        $gallery = $this->galleryService->getById($gallery->id);

        return Inertia::render('Administrator/Gallery/Edit', compact('gallery',));
    }

    public function update(Gallery $gallery, UpdateRequest $request): RedirectResponse
    {
        $this->galleryService->update($gallery, $request);

        return redirect('administrator/galleries')->with('success', 'Berhasil Update Galeri');
    }

    public function delete(Gallery $gallery): RedirectResponse
    {
        $this->galleryService->delete($gallery);

        return redirect('administrator/galleries')->with('success', 'Berhasil Hapus Galeri');
    }
}
