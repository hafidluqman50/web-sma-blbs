import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { CategoryArticle, CategoryArticleForm } from "./type";
import { PageProps } from "@/types";

type CategoryArticleProps = {
    category_article: CategoryArticle
}

export default function Page({category_article}: PageProps<CategoryArticleProps>): ReactNode {

    const { data, setData, put, processing, errors, reset } = useForm<CategoryArticleForm>({
        name: category_article.name,
    })

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('administrator.category-articles.update', category_article.id));
    }

    return(
        <>
        <Head title="Data Kategori Berita" />
        <AdministratorLayout data={menus('category-articles')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('administrator.category-articles')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="name"> Nama Kategori </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-2"
                                    value={data.name}
                                    placeholder="Isi Nama Kategori"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4 w-full border-t-2 border-slate-200 pt-4">
                                <Button variant={'warning'} disabled={processing}>Edit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
        </>
    )
}
