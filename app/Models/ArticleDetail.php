<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArticleDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'category_article_id'
    ];

    public function categoryArticle(): BelongsTo
    {
        return $this->belongsTo(CategoryArticle::class, 'category_article_id', 'id');
    }
}
