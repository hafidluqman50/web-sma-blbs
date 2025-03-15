import * as React from 'react'
import { Link } from '@inertiajs/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Article = ({children}: React.PropsWithChildren) => {
    return(
        <div>
            <Card className="relative shadow-md">
                {children}
            </Card>
        </div>
    )
}

type ArticleHeaderProps = {
    imageSrc?:string
}

const ArticleHeader = React.forwardRef<HTMLDivElement, ArticleHeaderProps>(
    ({imageSrc, ...props}, ref) => {
    return(
      <CardHeader className="w-full rounded-t-lg" style={{padding:'0'}}>
        <img className="h-60 w-full" src={imageSrc}/>
      </CardHeader>
    )
})

const ArticleBody = ({children}: React.PropsWithChildren) => {
    return(
        <CardContent>
            {children}
        </CardContent>
    )
}

const ArticleCategoryGrid = ({children}: React.PropsWithChildren) => {
    return(
        <div className="grid grid-cols-2 gap-2 mt-5">
            {children}
        </div>
    )
}

type ArticleCategoryProps = {
    categoryName:string
}

const ArticleCategory = React.forwardRef<HTMLDivElement, ArticleCategoryProps>(
    ({categoryName},ref) => {
        return(
            <div className="w-full min-h-8 bg-sky-400 rounded-lg py-1">
                <p className="text-white text-center text-sm font-outfit">{categoryName}</p>
            </div>
        )
    }
)

type ArticleTitleProps = {
    linkTo:string
    title:string
    inputBy:string
    inputDate:string
}

const ArticleTitle = React.forwardRef<HTMLDivElement, ArticleTitleProps>(
    ({linkTo, title, inputBy, inputDate},ref) => {
        return(
            <>
                <p className="font-semibold text-lg mb-4 mt-4 text-sky-400">
                    <Link href={linkTo}>{title}</Link>
                </p>
                <p className="text-md">
                    {inputBy} - {inputDate}
                </p>
            </>
        )
    }
)

export {
    Article,
    ArticleHeader,
    ArticleBody,
    ArticleCategoryGrid,
    ArticleCategory,
    ArticleTitle
}
