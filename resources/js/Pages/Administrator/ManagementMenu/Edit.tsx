import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ManagementMenu, ManagementMenuForm } from "./type";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react';
import { LampIcon } from "lucide-react";
import { PageProps } from "@/types";

type ManagementMenuProps = {
    management_menu: ManagementMenu
}

export default function Page({management_menu}: PageProps<ManagementMenuProps>): ReactNode {

    const { data, setData, put, processing, errors, reset } = useForm<ManagementMenuForm>({
        name: management_menu.name,
        content: management_menu.content,
        location_menu: management_menu.location_menu,
    })

    const editorRef = useRef<any>(null)

    const locationMenus: Array<{value: string, label: string}> = [
        {
            value: 'profil',
            label: 'Profil'
        },
        {
            value: 'program-sekolah',
            label: 'Program Sekolah'
        }
    ]

    const selectedLocation = locationMenus.find(({value}) => value === management_menu.location_menu)

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('administrator.management-menus.update', management_menu.id));
    }

    return(
        <>
        <Head title="Form Manajemen Menu" />
        <AdministratorLayout data={menus('management-menus')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="border-2 border-dotted border-amber-600 p-3 rounded-lg bg-zinc-50 mb-3">
                        <div className="flex text-amber-600 gap-1">
                            <div>
                                <LampIcon/>
                            </div>
                            <div>
                                <p><b>Tips Mengisi Data Menu!</b></p>
                            </div>
                        </div>
                        <ul className="list-disc p-5">
                            <li>Pastikan Memilih Lokasi Menu yang benar!</li>
                            <li>Hanya bisa menambahkan menu di lokasi Profil dan Program Sekolah!</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('administrator.management-menus')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="name"> Nama Menu </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="mt-2"
                                    value={data.name}
                                    placeholder="Isi Nama Menu"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="unit"> Konten </Label>
                                <Editor
                                    tinymceScriptSrc='/tinymce/tinymce.min.js'
                                    onInit={(_evt: any, editor: any) => editorRef.current = editor}
                                    onEditorChange={(value) => setData('content', value)}
                                    value={data.content}
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
                                        'removeformat typography fontsize fontselect | help',
                                        content_style: 'body { font-family:Work Sans, sans-serif; font-size:14px }',
                                        font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                        newline_behavior: "linebreak",
                                        remove_trailing_brs: false,
                                    }}
                                    />
                                <InputError message={ errors.content} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="category-articles"> Lokasi Menu </Label>
                                <Select
                                    id="category-articles"
                                    className="mt-2"
                                    options={locationMenus}
                                    defaultValue={selectedLocation}
                                    onChange={(event) => setData('location_menu', event!.value)}
                                />
                                <InputError message={ errors.location_menu} className="mt-2" />
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
