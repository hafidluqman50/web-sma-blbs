import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useRef, useState } from "react";
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
import { LampIcon } from "lucide-react";

type SelectProps = {
    category_articles: CategoryArticleSelect[]
}

export default function Page({ category_articles }: PageProps<SelectProps>): ReactNode {

    const [preview, setPreview] = useState<string|undefined>(undefined)

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
        <Head title="Form Berita" />
        <AdministratorLayout data={menus('articles')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="border-2 border-dotted border-amber-600 p-3 rounded-lg bg-zinc-50 mb-3">
                        <div className="flex text-amber-600 gap-1">
                            <div>
                                <LampIcon/>
                            </div>
                            <div>
                                <p><b>Tips Mengisi Data Berita!</b></p>
                            </div>
                        </div>
                        <ul className="list-disc p-5">
                            <li>Jika ingin menampilkan berita di section "INFO TERKINI" pastikan memilih kategori "Pengumuman"</li>
                            <li>Kategori Berita dapat dipilih lebih dari 1</li>
                            <li>Pastikan Kategori Berita sesuai dengan konteks berita!</li>
                        </ul>
                    </div>
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
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        extended_valid_elements: 'ol[class=list-decimal]' +
                                        ',ul[class=list-disc],h1[class=text-2xl text-bold]' +
                                        ',h2[class=text-xl text-bold],h3[class=text-lg text-bold]' +
                                        ',h4[class=text-md text-bold],h5[class=text-sm text-bold],h6[class=text-xs text-bold]'
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
                                        onChange={(event) => {
                                            if(event.target.files) {
                                                setPreview(URL.createObjectURL(event.target.files[0]))
                                            } else {
                                                setPreview(undefined)
                                            }
                                            setData('image', event.target.files ? event.target.files[0] : null)
                                        }}
                                />
                                <img className="mt-3 w-2/6" src={preview} />
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
