<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VideoController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [VideoController::class, 'index'])->name('video.index');
Route::get('/clean', [VideoController::class, 'clean'])->name('video.clean');

Route::get('/video', [VideoController::class, 'index'])->name('video.index');
Route::get('/video/{id}', [VideoController::class, 'show'])->name('video.show');
Route::post('/video', [VideoController::class, 'store'])->name('video.store');
Route::delete('/video/{id}', [VideoController::class, 'destroy'])->name('video.destroy');


Route::get('/editor', function () {
    return Inertia::render('Editor/index');
})->name('motionlayer.editor');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
