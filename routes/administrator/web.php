<?php

use App\Http\Controllers\Administrator\ArticleController;
use App\Http\Controllers\Administrator\CategoryArticleController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\GalleryController;
use App\Http\Controllers\Administrator\TeacherController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [DashboardController::class, 'index'])->name('administrator.dashboard');

Route::group(['prefix' => 'articles'], function() {
   Route::get('/', [ArticleController::class, 'index'])->name('administrator.articles');
   Route::get('/create', [ArticleController::class, 'create'])->name('administrator.articles.create');
   Route::post('/store', [ArticleController::class, 'store'])->name('administrator.articles.store');
   Route::get('/edit/{article}', [ArticleController::class, 'edit'])->name('administrator.articles.edit');
   Route::put('/update/{article}', [ArticleController::class, 'update'])->name('administrator.articles.update');
   Route::delete('/delete/{article}', [ArticleController::class, 'delete'])->name('administrator.articles.delete');
});

Route::group(['prefix' => 'category-articles'], function() {
   Route::get('/', [CategoryArticleController::class, 'index'])->name('administrator.category-articles');
   Route::get('/create', [CategoryArticleController::class, 'create'])->name('administrator.category-articles.create');
   Route::post('/store', [CategoryArticleController::class, 'store'])->name('administrator.category-articles.store');
   Route::get('/edit/{categoryArticle}', [CategoryArticleController::class, 'edit'])->name('administrator.category-articles.edit');
   Route::put('/update/{categoryArticle}', [CategoryArticleController::class, 'update'])->name('administrator.category-articles.update');
   Route::delete('/delete/{categoryArticle}', [CategoryArticleController::class, 'delete'])->name('administrator.category-articles.delete');
});

Route::group(['prefix' => 'galleries'], function() {
   Route::get('/', [GalleryController::class, 'index'])->name('administrator.galleries');
   Route::get('/create', [GalleryController::class, 'create'])->name('administrator.galleries.create');
   Route::post('/store', [GalleryController::class, 'store'])->name('administrator.galleries.store');
   Route::get('/edit/{gallery}', [GalleryController::class, 'edit'])->name('administrator.galleries.edit');
   Route::put('/update/{gallery}', [GalleryController::class, 'update'])->name('administrator.galleries.update');
   Route::delete('/delete/{gallery}', [GalleryController::class, 'delete'])->name('administrator.galleries.delete');
});

Route::group(['prefix' => 'teachers'], function() {
   Route::get('/', [TeacherController::class, 'index'])->name('administrator.teachers');
   Route::get('/create', [TeacherController::class, 'create'])->name('administrator.teachers.create');
   Route::post('/store', [TeacherController::class, 'store'])->name('administrator.teachers.store');
   Route::get('/edit/{teacher}', [TeacherController::class, 'edit'])->name('administrator.teachers.edit');
   Route::put('/update/{teacher}', [TeacherController::class, 'update'])->name('administrator.teachers.update');
   Route::delete('/delete/{teacher}', [TeacherController::class, 'delete'])->name('administrator.teachers.delete');
});
