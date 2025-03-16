<?php

namespace App\Http\Services\Administrator;

use App\Http\Repositories\Administrator\ArticleDetailRepository;
use App\Http\Repositories\Administrator\ArticleRepository;
use App\Http\Requests\Administrator\Article\IndexRequest;
use App\Http\Requests\Administrator\Article\StoreRequest;
use App\Http\Requests\Administrator\Article\UpdateRequest;
use App\Models\Article;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ArticleService
{
    public function __construct(
        private ArticleRepository $articleRepository,
        private ArticleDetailRepository $articleDetailRepository
    ){}

    public function getAll(): Collection
    {
        return $this->articleRepository->getAll();
    }

    public function getWithPagination(IndexRequest $request): array
    {
        $articles = $this->articleRepository->getWithPagination($request);
        return [
            $articles,
            ($articles->currentPage() - 1) * $articles->perPage() + 1
        ];
    }

    public function getById(int $id): Article
    {
        return $this->articleRepository->getById($id);
    }

    public function store(StoreRequest $request): array
    {

        DB::beginTransaction();

        try {
           $urlImage = $request->image->storePubliclyAs(
               '/articles',
               time().'.'.$request->image->getClientOriginalExtension(),
               's3'
           );

           $data = [
               'date'    => $request->date,
               'title'   => $request->title,
               'content' => $request->content,
               'slug'    => Str::slug($request->title, '-'),
               'image'   => config('filesystems.disks.s3.url').$urlImage,
               'user_id' => auth()->id()
           ];

           $article = $this->articleRepository->store($data);

           $articleDetails = [];

           collect($request->category_articles)->map(function(int $value) use (&$articleDetails, $article) {
              $articleDetails[] = $this->articleDetailRepository->store([
                   'article_id'          => $article->id,
                   'category_article_id' => $value
              ]);
           });

           DB::commit();

           return [
               'article' => $article,
               'article_details' => $articleDetails
           ];

        } catch(Exception $exception) {
            DB::rollBack();
            throw new Exception($exception->getMessage().' - '.$exception->getLine());
        }
    }

    public function update(Article $article, UpdateRequest $request): array
    {
        DB::beginTransaction();

        try {

            $data = [
                'date'    => $request->date,
                'title'   => $request->title,
                'content' => $request->content,
                'slug'    => Str::slug($request->title, '-'),
            ];

            if($request->hasFile('image')) {
                $urlImage = $request->image->storePubliclyAs(
                    '/articles',
                    time().'.'.$request->image->getClientOriginalExtension(),
                    's3'
                );

                $data['image'] = config('filesystems.disks.s3.url').$urlImage;
            }

            $this->articleDetailRepository->deleteByArticleId($article->id);

            $this->articleRepository->update($article, $data);

            $articleDetails = [];

            collect($request->category_articles)->map(function(int $value) use (&$articleDetails, $article) {
                $articleDetails[] = $this->articleDetailRepository->store([
                    'article_id'          => $article->id,
                    'category_article_id' => $value
                ]);
            });

            DB::commit();

            return [
                'article' => $article,
                'article_details' => $articleDetails
            ];

        } catch(Exception $exception) {
            DB::rollBack();
            throw new Exception($exception->getMessage().' - '.$exception->getLine());
        }
    }

    public function delete(Article $article): void
    {
        $article->delete();
    }
}
