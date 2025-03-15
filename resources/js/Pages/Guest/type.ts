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
    article_details: Array<{
        name: string
    }>
}

export interface InfoArticle {
    id: number
    date: string
    title: string
    slug: string
    content: string
    image: string
    user: {
        name: string
    }
}
