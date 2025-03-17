<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\Article\IndexRequest;
use App\Http\Requests\Operator\Article\StoreRequest;
use App\Http\Requests\Operator\Article\UpdateRequest;
use App\Http\Services\Operator\ArticleService;
use App\Http\Services\Operator\CategoryArticleService;
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

        return Inertia::render('Operator/Article/Main', compact('articles', 'page_num'));
    }

    public function create(): Response
    {
        $category_articles = $this->categoryArticleService->getAll()->map(function(CategoryArticle $map) {
            return App::make(CategoryArticleSelectTransformer::class)->transform($map);
        });

        return Inertia::render('Operator/Article/Create', compact('category_articles'));
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->articleService->store($request);

        return redirect('operator/articles')->with('success', 'Berhasil Input Berita!');
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

        return Inertia::render('Operator/Article/Edit', compact('article', 'category_articles', 'selected_categories'));
    }

    public function update(Article $article, UpdateRequest $request): RedirectResponse
    {
        $this->articleService->update($article, $request);

        return redirect('operator/articles')->with('success', 'Berhasil Update Berita');
    }

    public function delete(Article $article): RedirectResponse
    {
        $this->articleService->delete($article);

        return redirect('operator/articles')->with('success', 'Berhasil Hapus Berita');
    }
}
