<?php

use App\Http\Controllers\Guest\AcademicCalendarController;
use App\Http\Controllers\Guest\ArticleController;
use App\Http\Controllers\Guest\GalleryController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\Guest\TeacherController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);

Route::group(['prefix' => 'news'], function() {
    Route::get('/', [ArticleController::class, 'index'])->name('guest.articles');
    Route::get('/{slug}', [ArticleController::class, 'show'])->name('guest.articles.show');
});

Route::group(['prefix' => 'info-news'], function() {
    Route::get('/', [InfoArticleController::class, 'index'])->name('guest.info-articles');
    Route::get('/{slug}', [ArticleController::class, 'show'])->name('guest.info-articles.show');
});

Route::group(['prefix' => 'galleries'], function() {
   Route::get('/', [GalleryController::class, 'index'])->name('guest.galleries');
});

Route::group(['prefix' => 'teachers'], function() {
   Route::get('/', [TeacherController::class, 'index'])->name('guest.teachers');
});

Route::group(['prefix' => 'academic-calendars'], function() {
   Route::get('/', [AcademicCalendarController::class, 'index'])->name('guest.academic-calendars');
});

require __DIR__.'/auth.php';
