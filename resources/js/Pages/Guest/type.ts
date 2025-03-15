export interface Article {
    id: number
    date: string
    title: string
    slug: string
    content: string
    image: string
    user: {
        name: string
    }
    article_details: ArticleDetail[]
}

export interface ArticleDetail {
    id: number
    name: string
    slug_name: string
}
