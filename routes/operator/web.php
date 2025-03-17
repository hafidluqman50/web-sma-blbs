<?php

use App\Http\Controllers\Operator\AcademicCalendarController;
use App\Http\Controllers\Operator\ArticleController;
use App\Http\Controllers\Operator\CategoryArticleController;
use App\Http\Controllers\Operator\DashboardController;
use App\Http\Controllers\Operator\GalleryController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'user.has.role:operator'], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('operator.dashboard');

    Route::group(['prefix' => 'articles'], function() {
        Route::get('/', [ArticleController::class, 'index'])->name('operator.articles');
        Route::get('/create', [ArticleController::class, 'create'])->name('operator.articles.create');
        Route::post('/store', [ArticleController::class, 'store'])->name('operator.articles.store');
        Route::get('/edit/{article}', [ArticleController::class, 'edit'])->name('operator.articles.edit');
        Route::put('/update/{article}', [ArticleController::class, 'update'])->name('operator.articles.update');
        Route::delete('/delete/{article}', [ArticleController::class, 'delete'])->name('operator.articles.delete');
    });

    Route::group(['prefix' => 'category-articles'], function() {
        Route::get('/', [CategoryArticleController::class, 'index'])->name('operator.category-articles');
        Route::get('/create', [CategoryArticleController::class, 'create'])->name('operator.category-articles.create');
        Route::post('/store', [CategoryArticleController::class, 'store'])->name('operator.category-articles.store');
        Route::get('/edit/{categoryArticle}', [CategoryArticleController::class, 'edit'])->name('operator.category-articles.edit');
        Route::put('/update/{categoryArticle}', [CategoryArticleController::class, 'update'])->name('operator.category-articles.update');
        Route::delete('/delete/{categoryArticle}', [CategoryArticleController::class, 'delete'])->name('operator.category-articles.delete');
    });

    Route::group(['prefix' => 'galleries'], function() {
        Route::get('/', [GalleryController::class, 'index'])->name('operator.galleries');
        Route::get('/create', [GalleryController::class, 'create'])->name('operator.galleries.create');
        Route::post('/store', [GalleryController::class, 'store'])->name('operator.galleries.store');
        Route::get('/edit/{gallery}', [GalleryController::class, 'edit'])->name('operator.galleries.edit');
        Route::put('/update/{gallery}', [GalleryController::class, 'update'])->name('operator.galleries.update');
        Route::delete('/delete/{gallery}', [GalleryController::class, 'delete'])->name('operator.galleries.delete');
    });

    Route::group(['prefix' => 'academic-calendars'], function () {
        Route::get('/', [AcademicCalendarController::class, 'index'])->name('operator.academic-calendars');
        Route::get('/create', [AcademicCalendarController::class, 'create'])->name('operator.academic-calendars.create');
        Route::post('/store', [AcademicCalendarController::class, 'store'])->name('operator.academic-calendars.store');
        Route::get('/edit/{academicCalendar}', [AcademicCalendarController::class, 'edit'])->name('operator.academic-calendars.edit');
        Route::put('/update/{academicCalendar}', [AcademicCalendarController::class, 'update'])->name('operator.academic-calendars.update');
        Route::delete('/delete/{academicCalendar}', [AcademicCalendarController::class, 'delete'])->name('operator.academic-calendars.delete');
    });
});
