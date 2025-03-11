import * as React from 'react';
import { Link } from '@inertiajs/react'

type InfoArticleProps = {
   toLink:string
   title:string
   dateArticle:string
   imgSrc:string
}

const InfoArticle = React.forwardRef<HTMLDivElement,InfoArticleProps>(
    ({title, dateArticle, toLink, imgSrc},ref) => {
        return(
            <>
                <div className="w-40 h-32 items-center">
                    <img className="w-full h-full rounded-lg" src={imgSrc}/>
                </div>
                <div className="border-r-2 border-gray-200 px-5 py-5 mr-10">
                    <p className="text-slate-400 text-sm font-outfit">{dateArticle}</p>
                    <p className="font-semibold font-outfit">
                        <Link href={toLink}>{title}</Link>
                    </p>
                </div>
            </>
        )
    })

export {InfoArticle}
