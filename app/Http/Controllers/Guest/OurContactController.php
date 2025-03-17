<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OurContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Guest/OurContact/Main');
    }
}
