import GuestLayout from "@/Layouts/Guest/Layout"
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react"
import { ReactNode, useState } from "react";
import { Gallery } from "../type";
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type GalleryProps = {
    galleries: Array<Gallery>
}

export default function Page({galleries}: PageProps<GalleryProps>): ReactNode {

        const [selectImage, setSelectImage]   = useState<string>('');
        const [imageCaption, setImageCaption] = useState<string>('');
        const [openLightBox, setOpenLightBox] = useState<boolean>(false);

        const clickImage = (url: string, caption: string): void => {
            setSelectImage(url)
            setImageCaption(caption)
            setOpenLightBox(true)
        }

        const closeImage = (): void => {
            setSelectImage('')
            setImageCaption('')
            setOpenLightBox(false)
        }
    return (
        <>
            <Head title="Data Galeri" />
            <GuestLayout>
                <section id="gallery" className="relative isolate py-40 px-5 lg:px-10 min-h-screen sm:py-40 font-outfit">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <Link href="/">
                              Beranda
                          </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <Link href={route('guest.galleries')}>
                                Galeri
                            </Link>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col justify-items-center items-center">
                        <div className="w-full mb-5">
                            <p className="text-3xl font-outfit text-center">
                                GALERI SEKOLAH
                            </p>
                            <p className="text-lg font-outfit text-zinc-500 text-center mt-2">
                                Galeri foto-foto kegiatan Sekolah kami.
                            </p>
                            <hr className="mt-2 border-1 border-sky-500 mb-5" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
                            {
                                galleries.map((gallery) => (
                                    <motion.div whileTap={{ scale: 1.1 }} onClick={() => clickImage(
                                        gallery.image,
                                        gallery.caption
                                    )}>
                                        <img className="w-full h-full rounded-md" src={gallery.image} />
                                    </motion.div>
                                ))
                            }
                        </div>
                        <div id="lightbox" className={`${openLightBox ? '' : 'hidden'} target:block fixed z-50 inset-0 bg-black/90 overflow-auto mt-20 flex flex-col`} style={{'zIndex':'999999'}}>
                            <div className="relative">
                                <div>
                                    <Button className="px-3 py-1 text-white text-lg absolute right-0 top-0 mt-5" variant="ghost" onClick={() => closeImage()}>X</Button>
                                </div>
                                <div>
                                    <img
                                        className="w-12/12 relative left-8 lg:left-1/4 md:left-36 sm:left-10 lg:w-6/12 md:w-2/3 sm: w-10/12 lg:h-3/3 md:h-2/3 rounded-md mt-20 lg:mt-10 md:mt-10 z-50"
                                        src={selectImage}
                                    />
                                </div>
                                <div className="relative mt-5 lg:mt-2">
                                    <p className="text-white font-outfit text-center">
                                        {imageCaption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    )
}
