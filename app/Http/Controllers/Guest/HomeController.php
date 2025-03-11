<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\ArticleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    public function __construct(
        private ArticleService $articleService
    ){}

    public function index(): Response
    {
        $articles = $this->articleService->getAll();

        return Inertia::render('Guest/Home/Main', compact('articles'));
    }
}
