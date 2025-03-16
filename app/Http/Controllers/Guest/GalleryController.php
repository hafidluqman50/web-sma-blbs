<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\Gallery\IndexRequest;
use App\Http\Services\Guest\GalleryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __construct(
        private GalleryService $gallerService
    ){}

    public function index(IndexRequest $request): Response
    {
        $galleries = $this->gallerService->getAll();

        return Inertia::render('Guest/Gallery/Main', compact('galleries'));
    }
}
