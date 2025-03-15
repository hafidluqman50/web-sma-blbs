<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\Article\IndexRequest;
use App\Http\Requests\Administrator\Article\StoreRequest;
use App\Http\Requests\Administrator\Article\UpdateRequest;
use App\Http\Services\Administrator\ArticleService;
use App\Http\Services\Administrator\CategoryArticleService;
use App\Http\Transformers\CategoryArticleSelectTransformer;
use App\Models\Article;
use App\Models\CategoryArticle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{

    public function __construct(
        private ArticleService $articleService,
        private CategoryArticleService $categoryArticleService
    ){}

    public function index(IndexRequest $request): Response
    {
        [$articles, $page_num] = $this->articleService->getWithPagination($request);

        return Inertia::render('Administrator/Article/Main', compact('articles', 'page_num'));
    }

    public function create(): Response
    {
        $category_articles = $this->categoryArticleService->getAll()->map(function(CategoryArticle $map) {
            return App::make(CategoryArticleSelectTransformer::class)->transform($map);
        });

        return Inertia::render('Administrator/Article/Create', compact('category_articles'));
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->articleService->store($request);

        return redirect('administrator/articles')->with('success', 'Berhasil Input Artikel!');
    }

    public function edit(Article $article): Response
    {
        $article = $this->articleService->getById($article->id);

        $category_articles = $this->categoryArticleService->getAll()->map(function(CategoryArticle $map) {
            return App::make(CategoryArticleSelectTransformer::class)->transform($map);
        });

        $selected_categories = $article->articleDetails->map(function(CategoryArticle $map) {
           return $map->id;
        });

        return Inertia::render('Administrator/Article/Edit', compact('article', 'category_articles', 'selected_categories'));
    }

    public function update(Article $article, UpdateRequest $request): RedirectResponse
    {
        $this->articleService->update($article, $request);

        return redirect('administrator/articles')->with('success', 'Berhasil Update Artikel');
    }

    public function delete(Article $article): RedirectResponse
    {
        $this->articleService->delete($article);

        return redirect('administrator/articles')->with('success', 'Berhasil Hapus Artikel');
    }
}
