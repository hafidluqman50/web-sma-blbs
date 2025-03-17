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

export interface Gallery {
    id: number
    date: string
    caption: string
    image: string
    user: {
        name: string
    }
}

export interface Teacher {
    id: number
    name: string
    image: string
    position: string
}

export interface AcademicCalendar {
    id: number
    year_academic: string
    image: string
}

export interface ManagementMenu {
    id: number
    name: string
    content: string
    slug: string
}
