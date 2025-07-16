<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/task', function () {
    return Inertia::render('/Task/index');
})->middleware(['auth', 'verified'])->name('task');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/task-lists', [TaskListController::class, 'store'])->middleware(['auth', 'verified'])->name('task-lists.store');
Route::get('/list', [TaskListController::class, 'index'])->middleware(['auth', 'verified'])->name('list');

Route::get('/list', [TaskListController::class, 'index'])->middleware(['auth', 'verified'])->name('list');
Route::put('/list/{id}', [TaskListController::class, 'update'])->middleware(['auth'])->name('list.update');
Route::delete('/list/{id}', [TaskListController::class, 'destroy'])->middleware(['auth'])->name('list.destroy');


require __DIR__.'/auth.php';
