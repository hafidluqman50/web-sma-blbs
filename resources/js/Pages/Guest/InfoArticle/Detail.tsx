import { SuggestionsArticle } from "@/components/pages/suggestions-article";
import { ReactNode } from "react";
import dayjs from 'dayjs'
import { PageProps } from "@/types";
import { InfoArticle } from "../type";
import GuestLayout from "@/Layouts/Guest/Layout";
import { Head, Link } from "@inertiajs/react";
import DOMPurify from 'dompurify';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

type InfoArticleDetailProps = {
    info_article: InfoArticle
    info_articles: Array<InfoArticle>
}

export default function Page({ info_article, info_articles }: PageProps<InfoArticleDetailProps>): ReactNode {
    return(
        <>
        <Head title={info_article.title} />
        <GuestLayout>
            <section id="detail-article" className="relative isolate bg-slate-50 py-40 px-5 lg:px-20 md:px-10 min-h-screen sm:py-40" style={{paddingBottom:'0'}}>
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
                    <BreadcrumbSeparator>
                        <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <Link href={`/info-news/${info_article.slug}`}>
                            {info_article.title}
                        </Link>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col lg:flex-row md:flex-row gap-5 mt-3">
                    <div className="w-full lg:w-2/3 mb-5 lg:mb-10 md:mb-10">
                        <h6 className="text-2xl font-semibold font-outfit mb-2">{info_article.title}</h6>
                        <p className="text-neutral-600 font-outfit text-lg">{info_article.user.name} - {dayjs(info_article.date).locale('id').format('D MMMM YYYY')}</p>
                        <img className="w-full h-4/4 mb-5 mt-5" src={info_article.image} alt={info_article.title} />
                        <hr className="py-2 border-1 border-sky-500 mb-5" />
                        <div className="font-work-sans leading-relaxed" dangerouslySetInnerHTML={{ __html: info_article.content }} />
                    </div>
                    <div className="w-full lg:w-1/3 mb-5 lg:mb-10 md:mb-10 font-outfit">
                        <h4 className="font-outfit text-sky-400 text-xl mb-2">
                            Lainnya
                        </h4>
                        {
                            info_articles.map((article, key) =>(
                                    <SuggestionsArticle key={key}
                                        title={ info_article.title }
                                        toLink={`/info-news/${info_article.slug}`}
                                    />
                                )
                            )
                        }
                    </div>
                </div>
            </section>
        </GuestLayout>
        </>
    )
}
