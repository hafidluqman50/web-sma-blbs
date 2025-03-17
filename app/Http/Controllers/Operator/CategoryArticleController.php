<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\CategoryArticle\IndexRequest;
use App\Http\Requests\Operator\CategoryArticle\StoreRequest;
use App\Http\Requests\Operator\CategoryArticle\UpdateRequest;
use App\Http\Services\Operator\CategoryArticleService;
use App\Models\CategoryArticle;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryArticleController extends Controller
{
    public function __construct(
        private CategoryArticleService $categoryArticleService
    ){}

    public function index(IndexRequest $request): Response
    {
        [$category_articles, $page_num] = $this->categoryArticleService->getWithPagination($request);

        return Inertia::render('Operator/CategoryArticle/Main', compact('category_articles', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Operator/CategoryArticle/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->categoryArticleService->store($request);

        return redirect('operator/category-articles')->with('success', 'Berhasil Input Kategori Berita');
    }

    public function edit(CategoryArticle $categoryArticle): Response
    {
        $category_article = $categoryArticle;

        return Inertia::render('Operator/CategoryArticle/Edit', compact('category_article'));
    }

    public function update(CategoryArticle $categoryArticle, UpdateRequest $request): RedirectResponse
    {
        $this->categoryArticleService->update($categoryArticle, $request);

        return redirect('operator/category-articles')->with('success', 'Berhasil Update Kategori Berita');
    }

    public function delete(CategoryArticle $categoryArticle): RedirectResponse
    {
        $this->categoryArticleService->delete($categoryArticle);

        return redirect('operator/category-articles')->with('success', 'Berhasil Hapus Kategori Berita');
    }
}
