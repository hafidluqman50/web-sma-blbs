import * as React from 'react'
import {Link} from '@inertiajs/react'
import {
  FrameIcon
} from "@radix-ui/react-icons"

type SuggestionsArticleProps = {
   toLink:string
   title:string
}

const SuggestionsArticle = React.forwardRef<HTMLDivElement, SuggestionsArticleProps>(
    ({title,toLink},ref) => {
        return(
            <div className="w-full min-h-[40px]
            lg:min-h-10 md:min-h-10 sm:min-h-10 border-b-2 border-slate-100 flex gap-0 mt-2 mb-2 whitespace-normal">
                <div className="mr-2">
                    <FrameIcon width={30} height={30} className="text-sky-400"/>
                </div>
                <div>
                    <Link href={toLink} className="text-md">{title}</Link>
                </div>
            </div>
        )
    })

export {SuggestionsArticle}
