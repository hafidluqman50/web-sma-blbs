<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\ArticleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function __construct(
        private ArticleService $articleService
    ){}

    public function show(string $slug): Response
    {
        $article  = $this->articleService->show($slug);
        $articles = $this->articleService->getAll();

        return Inertia::render('Guest/Article/Detail', compact('article', 'articles'));
    }
}
