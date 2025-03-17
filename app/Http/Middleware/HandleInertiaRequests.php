<?php

namespace App\Http\Middleware;

use App\Http\Services\Guest\ManagementMenuService;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        private ManagementMenuService $managementMenuService
    ){}
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'session' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'fail' => fn () => $request->session()->get('fail')
            ],
            'management_menu' => [
                'profil' => $this->managementMenuService->getByLocationMenu('profil'),
                'school_program' => $this->managementMenuService->getByLocationMenu('program-sekolah')
            ]
        ];
    }
}
