import { Article, ArticleBody, ArticleCategory, ArticleCategoryGrid, ArticleHeader, ArticleTitle } from "@/components/pages/article";
import { PageProps, PaginationData } from "@/types";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";
import { Article as ArticleType } from '../type';
import dayjs from 'dayjs'
import GuestLayout from "@/Layouts/Guest/Layout";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Slash } from "lucide-react";

interface ArticlesInterface {
    data:Array<ArticleType>;
    links:Array<PaginationData>;
}

type ArticleProps = {
    articles:ArticlesInterface
    search: string
}

export default function Page({articles, search: searchValue}: PageProps<ArticleProps>): ReactNode {

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
                    <Link href="/news">
                        Berita
                    </Link>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1">
                <div className="grid items-center justify-items-center w-full mb-5">
                    <div className="w-full lg:w-2/4 md:w-2/4 flex gap-2">
                        <Input
                            type="search"
                            placeholder="Cari Judul Berita"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <Button onClick={() => {
                            router.get(route('guest.articles', {
                                search
                            }))
                        }}>Cari</Button>
                    </div>
                </div>
                {
                articles.data.length == 0 ?
                    <div className="w-full mt-5">
                        <p className="text-center text-lg">Tidak Ada Berita</p>
                    </div>
                    : <></>
                }
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 pb-10 lg:pb-10">
                    {
                        articles.data.map((article, key) => (
                            <div>
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
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="grid justify-items-center w-full p-5">
                <Pagination>
                    <PaginationContent>
                    {
                        articles.links.map((pagination, key) => (
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
