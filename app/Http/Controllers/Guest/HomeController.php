<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\AcademicCalendarService;
use App\Http\Services\Guest\ArticleService;
use App\Http\Services\Guest\GalleryService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    public function __construct(
        private ArticleService $articleService,
        private GalleryService $galleryService,
        private AcademicCalendarService $academicCalendarService
    ){}

    public function index(): Response
    {
        $articles          = $this->articleService->getWithLimit(8);
        $galleries         = $this->galleryService->getWithLimit(5);
        $academic_calendar = $this->academicCalendarService->getFirst();

        return Inertia::render('Guest/Home/Main', compact('articles', 'galleries', 'academic_calendar'));
    }
}
