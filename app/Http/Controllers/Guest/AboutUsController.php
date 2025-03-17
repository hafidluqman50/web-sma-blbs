<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Services\Guest\ManagementMenuService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutUsController extends Controller
{
    public function __construct(
        private ManagementMenuService $managementMenuService
    ){}

    public function index(string $slug): Response
    {
        $about_us = $this->managementMenuService->getBySlug($slug);

        return Inertia::render('Guest/AboutUs/Main', compact('about_us'));
    }
}
