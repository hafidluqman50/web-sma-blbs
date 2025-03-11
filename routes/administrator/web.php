<?php

use App\Http\Controllers\Administrator\ArticleController;
use App\Http\Controllers\Administrator\DashboardController;
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
