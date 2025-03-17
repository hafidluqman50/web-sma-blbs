import GuestLayout from "@/Layouts/Guest/Layout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
import { ManagementMenu } from "../type";

type ManagementMenuProps = {
    about_us: ManagementMenu
}

export default function Page({about_us}: PageProps<ManagementMenuProps>): ReactNode
{
    return (
        <>
            <Head title={about_us.name} />
            <GuestLayout>
                <section id="about-us" className="relative isolate py-40 px-5 pb-5 lg:pb-2 md:pb-3 lg:px-10 min-h-screen sm:py-40 font-outfit">
                    <div className="flex flex-col justify-items-center items-center px-10">
                        <div className="w-full lg:w-2/4 md:w-2/4 sm:w-3/4 mb-5">
                            <p className="text-xl font-outfit text-center">
                                {about_us.name}
                            </p>
                            <hr className="mt-2 border-1 border-sky-500 mb-5" />
                        </div>
                        <div
                            className="w-full font-work-sans"
                            style={{
                                all: 'initial',
                                display: 'block',
                                fontFamily:'Lato,sans-serif',
                                lineHeight:'2',
                                letterSpacing:'0.2px'
                            }}
                            dangerouslySetInnerHTML={{__html:about_us.content}}
                        />
                    </div>
                </section>
            </GuestLayout>
        </>
    )
}
