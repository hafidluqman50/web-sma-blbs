
export interface Gallery {
    id: number
    date: string
    image: string
    caption: string
    user: {
        name: string
    }
}

export interface GalleryForm {
    date: string
    image: File|null
    caption: string
}
