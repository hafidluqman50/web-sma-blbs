import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import GuestLayout from '@/Layouts/Guest/Layout';

import { motion, useScroll } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

import {
  AcademicCapIcon,
  SparklesIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'

// import ttdKepsek from '~/assets/ttd_kepsek.png'
import imgKepsek from '@/assets/Kepsek_Edi_Purwanto.jpg'
import imgKepsek2 from '@/assets/kepsek_2.jpg'

import { Button,Carousel,Typography } from '@material-tailwind/react'

import {InfoArticle} from '@/components/pages/info-article'
import {SuggestionsArticle} from '@/components/pages/suggestions-article'
import {
    Article,
    ArticleHeader,
    ArticleBody,
    ArticleCategoryGrid,
    ArticleCategory,
    ArticleTitle
} from '@/components/pages/article'
import { Article as ArticleType } from '../type';
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

type ArticleProps = {
    articles:Array<ArticleType>
}

export default function Page({ articles }: PageProps<ArticleProps>) {
    const {scrollYProgress} = useScroll()

    dayjs.extend(calendar)

  return (
    <GuestLayout>
    <Head title='Beranda' />
    <section id="slider-banner" className="relative isolate py-24 min-h-full sm:py-24 pb-0">
        {/*
        // @ts-ignore */}
        <Carousel className="w-full h-96"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}>
            {
                articles.length == 0 ?
                <div className="relative h-full w-full">
                    <img
                      src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                      alt="image dummy"
                      className="h-full w-full object-cover"
                    />
                </div> : articles.map((article, index) =>
                    index >= 0 && index < 3 ? (
                        <div className="relative h-full w-full" key={index}>
                            <Link href={`/news/${article.slug}`}>
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="h-full w-full object-cover"
                                />
                            </Link>
                        </div>
                    ) : <></>
                )
            }
        </Carousel>
    </section>
    <section id="sambutan-kepala-sekolah" className="relative isolate bg-slate-50 px-10 py-20 lg:py-40 lg:px-32 md:px-28 min-h-screen sm:py-40 pb-0">
        <div className="grid lg:grid-cols-2 lg:gap-10 sm:grid-cols-1 sm:gap-10">
            <div className="mb-10">
                <p className="font-rubik text-lg mb-5 text-slate-500">Sambutan Kepala Sekolah</p>
                <p className="font-montserrat text-3xl font-bold tracking-tighter mb-10">CETAK GENERASI BERAHLAKUL KARIMAH PROFESIONAL DAN RELIGIUS MENYONGSONG INDONESIA EMAS 2045</p>
                <p className="font-rubik text-md">
                Membimbing peserta didik mengenali dan mengembangkan Potensi, Bakat, dan minatnya menjadi kompetensi yang berdaya saing, terampil menerapkan Ahlakul karimah, profesional dalam Penguasaan Ilmu Pengetahuan dan teknologi, menjadi hamba yang taat beragama. siap menjadi pemenang masa depan bukan penguasa masa lalu.
                </p>
                {/* <img className="w-4/12 h-4/12 mb-3 mt-3" src={ttdKepsek}/> */}
                <p className="font-secular-one text-xl mt-3 mb-3 font-extrabold">Edi Purwanto, M.Pd.</p>
            </div>
            <div className="mb-10 flex flex-col lg:flex-row md:flex-row gap-2">
                <img className="h-96" src={imgKepsek}/>
                <img className="h-96" src={imgKepsek2}/>
            </div>
        </div>
    </section>
    <section id="kalender-akademik" className="relative isolate py-20 h-1/4 sm:py-20 pb-0">
        <p className="text-center font-semibold text-xl font-noto-sans mb-10">
            KALENDER AKADEMIK
        </p>
    </section>
    <section id="info-terkini" className="relative isolate bg-stone-50 py-20 min-h[10rem]">
        <p className="text-center font-semibold text-xl font-noto-sans mb-10">
            INFO TERKINI
        </p>
        <div className="w-screen h-36 bg-white container mx-auto shadow-lg rounded-lg overflow-hidden flex flex-nowrap mask-blur px-32 font-outfit mb-3">
            <div className="flex animate-infinite-scroll py-2">
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="2 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="3 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="4 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="5 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="6 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="7 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="8 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="9 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="10 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="11 Months Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="1 Year Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="2 Years Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />
                <InfoArticle
                    title="Pengumuman Juara LKS"
                    dateArticle="3 Years Ago"
                    toLink="/info/pengumuman-juara-lks/"
                    imgSrc="https://smkn7-smr.sch.id/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-24-at-14.49.27_cd70688c-750x405.jpg"
                />

            </div>
        </div>
        <div className="grid justify-items-center mt-3 lg:mt-0">
            {/*
            // @ts-ignore */}
            <Button className="bg-gradient-blue" variant="gradient" size="md">
                <Link href="/info-news">Read More</Link>
            </Button>
        </div>
    </section>
    <section id="berita-terkini" className="relative isolate py-20 min-h-screen sm:py-20 pb-0">
        <p className="text-center font-semibold text-xl font-noto-sans">
            BERITA TERKINI
        </p>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 mt-24 container mx-auto font-outfit">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5 pb-10">
                {
                    articles.map((article, key) =>
                        key >= 0 && key < 4 ? (
                        <motion.div key={key}>
                            <Article>
                                <ArticleHeader
                                    imageSrc={article.image}
                                />
                                <ArticleBody>
                                <ArticleCategoryGrid>
                                    {
                                        article.article_details.map((category_article, key) => (

                                            <ArticleCategory key={key}
                                                categoryName={category_article.name}
                                            />
                                        ))
                                    }
                                </ArticleCategoryGrid>
                                <ArticleTitle
                                    linkTo={`/news/${article.slug}`}
                                    title={ article.title }
                                    inputBy={ article.user.name }
                                    inputDate={ dayjs(article.date).locale('id').format('D MMMM YYYY') }
                                />
                                </ArticleBody>
                            </Article>
                        </motion.div>
                    ) : <></>)
                }
            </div>
            <div className="flex flex-col">
                <h4 className="font-outfit text-sky-400 text-2xl mb-2">
                    Lainnya
                </h4>
                {
                    articles.map((article, key) =>
                        key >= 4 && key < 8 ? (
                            <SuggestionsArticle key={key}
                                title={ article.title }
                                toLink={`/news/${article.slug}`}
                            />
                        ) : <></>
                    )
                }
            </div>
        </div>
        <div className="grid justify-items-center mt-10 lg:mt-0 mb-10">
            {/*
            // @ts-ignore */}
            <Button className="bg-gradient-blue" variant="gradient" size="md">
                <Link href="/news">Read More</Link>
            </Button>
        </div>
    </section>
    <section id="galeri" className="relative bg-zinc-50 isolate py-10 lg:py-20 md:py-20 min-h-screen sm:py-20">
        <div className="grid grid-cols-1 grid-rows-1 lg:grid-rows-2 md:grid-rows-2 lg:grid-cols-4 md:grid-cols-4 gap-4 px-5 py-5 lg:px-0 md:px-0">
            <motion.div className="lg:row-span-2 lg:col-span-2 md:row-span-2 md:col-span-4" whileTap={{ scale: 1.1 }}>
                <img className="w-full h-full rounded-md" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-4.38.49-PM-767x500.jpeg"/>
            </motion.div>
            <motion.div whileTap={{scale:1.1}}>
                <img className="w-full h-full rounded-md" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-5.14.04-PM-767x500.jpeg"/>
            </motion.div>
            <motion.div whileTap={{scale:1.1}}>
                <img className="w-full h-full rounded-md" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-5.14.16-PM-767x500.jpeg"/>
            </motion.div>
            <motion.div whileTap={{scale:1.1}}>
                <img className="w-full h-full rounded-md" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-5.14.17-PM-767x500.jpeg"/>
            </motion.div>
            <motion.div whileTap={{scale:1.1}}>
                <img className="w-full h-full rounded-md" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-27-at-5.14.10-PM-767x500.jpeg"/>
            </motion.div>
        </div>
    </section>
    <section id="jurusan" className="relative isolate bg-slate-100 py-10 min-h-screen sm:py-10 lg:pb-0 md:pb-0 sm:pb-0">
        <p className="text-center font-semibold text-xl font-noto-sans mb-10 lg:mb-0 md:mb-0">
            JURUSAN
        </p>
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-15 sm:grid-cols-1 sm:gap-10 lg:mt-22
        container lg:py-24 md:py-24 lg:px-20 md:px-32 mx-auto font-work-sans">
        <Card>
          <CardHeader className="bg-sky-400 h-48 rounded-t-lg">
            <AcademicCapIcon className="text-white text-center"/>
          </CardHeader>
          <CardContent>
            <p className="text-center font-semibold text-lg mb-4 mt-4 text-sky-400">REGULER/UMUM</p>
            <p className="text-center text-md">
            Peserta didik mengikuti Pembelajaran intensif di kelas menggunakan kurikulum merdeka, dan peserta didik dapat mempunyai keahlian tambahan dengan mengikuti kegiatan ekstrakurikuler yang ada antara lain : Ekskul Astronomi, Biologi, English Fun, Fisika, Kimia, Matematika, Jurnalistik, PIK - R, PMR, Tata Boga dan Tahfidz Qur'an.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-orange-400 h-48 rounded-t-lg">
            <SparklesIcon className="text-white text-center"/>
          </CardHeader>
          <CardContent>
            <p className="text-center font-semibold text-lg mb-4 mt-4 text-orange-400">ATLET</p>
            <p className="text-center text-md">
            Peserta didik mengikuti pembelajaran secara intensif menggunakan kurikulum merdeka dan peserta didik mendapatkan pembinaan khusus sesuai dengan kelas yang telah dipilih (Forsgi Atau Persinas) dan dipersilahkan mengikuti ekskul yang telah disediakan.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-green-400 h-48 rounded-t-lg">
            <ComputerDesktopIcon className="text-white text-center"/>
          </CardHeader>
          <CardContent>
            <p className="text-center font-semibold text-lg mb-4 mt-4 text-green-400">IT</p>
            <p className="text-center text-md">
            Di jurusan ini kamu akan mempelajari bagaimana menggunakan teknologi komputer secara optimal guna menangani masalah transformasi atau pengolahan data dengan proses logika.
            </p>
          </CardContent>
        </Card>
        </div>
    </section>
    <section id="brand" className="relative isolate h-1/3 pb-0">
        <div className="grid grid-cols-1 gap-9 justify-items-center lg:grid-cols-4 lg:gap-10 sm:grid-cols-1 sm:gap-10 lg:mt-22
        container py-24 lg:px-32 md:px-32 sm:px-32 mx-auto">
            <div>
                <img className="w-4/4 h-20" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/google-sm.png"/>
            </div>
            <div>
                <img className="w-4/4 h-20" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/bisaai-sm.png"/>
            </div>
            <div>
                <img className="w-4/4 h-20" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/kedata.png"/>
            </div>
            <div>
                <img className="w-4/4 h-20" src="https://smkn7-smr.sch.id/wp-content/uploads/2022/06/Jupiter_IT_Solutions_Long.png"/>
            </div>
        </div>
    </section>
    </GuestLayout>
  )
}
