<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Administrator\CategoryArticle\IndexRequest;
use App\Http\Requests\Administrator\CategoryArticle\StoreRequest;
use App\Http\Requests\Administrator\CategoryArticle\UpdateRequest;
use App\Http\Services\Administrator\CategoryArticleService;
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

        return Inertia::render('Administrator/CategoryArticle/Main', compact('category_articles', 'page_num'));
    }

    public function create(): Response
    {
        return Inertia::render('Administrator/CategoryArticle/Create');
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $this->categoryArticleService->store($request);

        return redirect('administrator/category-articles')->with('success', 'Berhasil Input Kategori Berita');
    }

    public function edit(CategoryArticle $categoryArticle): Response
    {
        $category_article = $categoryArticle;

        return Inertia::render('Administrator/CategoryArticle/Edit', compact('category_article'));
    }

    public function update(CategoryArticle $categoryArticle, UpdateRequest $request): RedirectResponse
    {
        $this->categoryArticleService->update($categoryArticle, $request);

        return redirect('administrator/category-articles')->with('success', 'Berhasil Update Kategori Berita');
    }

    public function delete(CategoryArticle $categoryArticle): RedirectResponse
    {
        $this->categoryArticleService->delete($categoryArticle);

        return redirect('administrator/category-articles')->with('success', 'Berhasil Hapus Kategori Berita');
    }
}
