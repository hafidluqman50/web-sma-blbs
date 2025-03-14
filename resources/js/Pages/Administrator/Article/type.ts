
export interface Article {
    id: number
    date: string
    title: string
    content: string
    image: string
    user: {
        name: string
    }
    article_details: Array<{
        name: string
    }>
}

export interface CategoryArticleSelect {
    value: number
    label: string
}

export interface ArticleForm {
    title: string
    date: string
    image: File|null
    category_articles: any
    content: string
}
