import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryArticleSelect, ArticleForm } from "./type";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import Select from 'react-select'
import { PageProps } from "@/types";
import { Editor } from '@tinymce/tinymce-react';
import dayjs from "dayjs";

type SelectProps = {
    category_articles: CategoryArticleSelect[]
}

export default function Page({ category_articles }: PageProps<SelectProps>): ReactNode {
    const { data, setData, post, processing, errors, reset } = useForm<ArticleForm>({
        date: dayjs().format('YYYY-MM-DD'),
        title: '',
        content: '',
        category_articles: [],
        image: null
    })

    const editorRef = useRef<any>(null)

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('administrator.articles.store'));
    }

    return(
        <>
        <Head title="Data Berita" />
        <AdministratorLayout data={menus('articles')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('administrator.articles')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="date"> Tanggal Berita </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    className="mt-2"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="name"> Judul Berita </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-2"
                                    value={data.title}
                                    placeholder="Isi Nama Berita"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="unit"> Konten </Label>
                                <Editor
                                    tinymceScriptSrc='/tinymce/tinymce.min.js'
                                    onInit={(_evt: any, editor: any) => editorRef.current = editor}
                                    onEditorChange={(value) => setData('content', value)}
                                    licenseKey="gpl"
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    />
                                <InputError message={ errors.content} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="category-articles"> Kategori Berita </Label>
                                <Select
                                    id="category-articles"
                                    className="mt-2"
                                    isMulti
                                    options={category_articles ?? []}
                                    onChange={(event) => {
                                            setData('category_articles', event.map((val) => {
                                                return val.value
                                            }))
                                        }
                                    }
                                />
                                <InputError message={ errors.category_articles} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="image"> Gambar </Label>
                                <Input
                                    type="file"
                                    onChange={(event) => setData('image', event.target.files ? event.target.files[0] : null)}
                                />
                                <InputError message={ errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4 w-full border-t-2 border-slate-200 pt-4">
                                <Button disabled={processing}>Simpan</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
        </>
    )
}
