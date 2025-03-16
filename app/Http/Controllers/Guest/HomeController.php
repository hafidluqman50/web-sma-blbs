<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\ArticleService;
use App\Http\Services\Guest\GalleryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    public function __construct(
        private ArticleService $articleService,
        private GalleryService $galleryService
    ){}

    public function index(): Response
    {
        $articles  = $this->articleService->getWithLimit(8);
        $galleries = $this->galleryService->getWithLimit(5);

        return Inertia::render('Guest/Home/Main', compact('articles', 'galleries'));
    }
}
