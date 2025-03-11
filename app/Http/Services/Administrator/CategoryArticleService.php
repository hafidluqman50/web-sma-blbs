<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\CategoryArticleRepository;
use Illuminate\Support\Collection;

class CategoryArticleService
{
    public function __construct(
        private CategoryArticleRepository $categoryArticleRepository
    ){}

    public function getAll(): Collection
    {
        return $this->categoryArticleRepository->getAll();
    }
}
