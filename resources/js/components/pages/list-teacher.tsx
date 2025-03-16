import React from 'react'

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from '@/components/ui/card'

interface ListTeacherProps {
    imgSrc:string;
    name:string;
    position:string;
}

const ListTeacher = ({imgSrc, name, position}: ListTeacherProps) => {
    return(
        <Card className="w-full h-[350px] lg:w-11/12 md:w-11/12 sm:w-9/12 mb-5 relative shadow-sm hover:shadow-md">
            <CardContent className="p-0 h-[350px] relative">
                <img className="w-full h-full" src={imgSrc}/>
                <div className="absolute w-3/4 top-2/4 left-5 flex flex-col">
                    <div className='bg-black/45 p-2 text-white '>
                        <p className="text-lg font-montserrat">
                            {name}
                        </p>
                    </div>
                    <div className="w-full lg:w-2/2 md:w-2/2 sm:w-10/12 bg-sky-500 px-2 py-3 break-words mt-2">
                        <p className="text-sm lg:text-sm md:text-sm sm:text-xs text-white font-montserrat">
                            {position}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { ListTeacher }
