import { Article, ArticleBody, ArticleCategory, ArticleCategoryGrid, ArticleHeader, ArticleTitle } from "@/components/pages/article";
import { PageProps, PaginationData } from "@/types";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";
import { InfoArticle as InfoArticleType } from '../type';
import dayjs from 'dayjs'
import GuestLayout from "@/Layouts/Guest/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Slash } from "lucide-react";

interface InfoArticlesInterface {
    data:Array<InfoArticleType>;
    links:Array<PaginationData>;
}

type ArticleProps = {
    info_articles:InfoArticlesInterface
    search: string
}

export default function Page({info_articles, search: searchValue}: PageProps<ArticleProps>): ReactNode {

    const [search, setSearch] = useState<string>(searchValue)

    return(
        <>
        <Head title="Berita Artikel" />
        <GuestLayout>
        <section id="news" className="relative isolate py-40 px-5 lg:px-10 min-h-screen sm:py-40 font-outfit" style={{paddingBottom:'0'}}>
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
                    <Link href="/info-news">
                        Pengumuman
                    </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1">
                <div className="grid items-center justify-items-center w-full mb-5">
                    <div className="w-full lg:w-2/4 md:w-2/4 flex gap-2">
                        <Input
                            type="search"
                            placeholder="Cari Pengumuman"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Button onClick={() => {
                            router.get(route('guest.info-articles', {
                                search
                            }))
                        }}>Cari</Button>
                    </div>
                </div>
                {
                info_articles.data.length == 0 ?
                    <div className="w-full mt-5">
                        <p className="text-center text-lg">Tidak Ada Pengumuman</p>
                    </div>
                    : <></>
                }
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 pb-10 lg:pb-10">
                    {
                        info_articles.data.map((info_article, key) => (
                            <div>
                                <Article>
                                    <ArticleHeader
                                        imageSrc={info_article.image}
                                    />
                                    <ArticleBody>
                                    <ArticleTitle
                                        linkTo={`/info-news/${info_article.slug}`}
                                        title={ info_article.title }
                                        inputBy={ info_article.user.name }
                                        inputDate={ dayjs(info_article.date).locale('id').format('D MMMM YYYY') }
                                    />
                                    </ArticleBody>
                                </Article>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="grid justify-items-center w-full p-5">
                <Pagination>
                    <PaginationContent>
                    {
                        info_articles.links.map((pagination, key) => (
                            <div key={key}>
                            {
                                pagination.label.includes('Previous') ?
                                <Link href={pagination.url === undefined ? '#' : pagination.url}>
                                    <PaginationPrevious className="bg-zinc-800 hover:bg-zinc-600 hover:text-white text-white"/>
                                </Link> : ''
                            }
                            {
                                !pagination.label.includes('Previous') && !pagination.label.includes('Next') ?

                                <Link href={pagination.url === undefined ? '#' : pagination.url}>
                                    <PaginationItem key={key}>
                                        <PaginationLink isActive={pagination.active}>
                                        {pagination.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                </Link>
                                :''
                            }
                            {
                                pagination.label.includes('Next') ?
                                <Link href={pagination.url === undefined ? '#' : pagination.url}>
                                    <PaginationNext className="bg-zinc-800 hover:bg-zinc-600 hover:text-white text-white"/>
                                </Link> : ''
                            }
                            </div>
                        ))
                    }
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
        </GuestLayout>
        </>
    )
}
