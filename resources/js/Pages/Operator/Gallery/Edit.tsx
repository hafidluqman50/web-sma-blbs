import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { Gallery, GalleryForm } from "./type";
import { Textarea } from "@/components/ui/textarea";
import { PageProps } from "@/types";

type GalleryProps = {
    gallery: Gallery
}

export default function Page({gallery}: PageProps<GalleryProps>): ReactNode {

    const [preview, setPreview] = useState<string|undefined>(undefined)

    const { data, setData, post, processing, errors, reset } = useForm<GalleryForm>({
        date: gallery.date,
        image: null,
        caption: gallery.caption
    })

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        router.post(route('operator.galleries.update', gallery.id), {
            _method:'PUT',
            ...data
        });
    }

    return(
        <>
        <Head title="Form Galeri" />
        <AdministratorLayout data={menus('galleries')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('operator.galleries')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="date"> Tanggal Galeri </Label>
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
                                <Textarea
                                    onChange={(e) => setData('caption', e.target.value)}
                                    value={data.caption}
                                />
                                <InputError message={errors.caption} className="mt-2" />
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
                                <img className="mt-3 w-2/6" src={preview ?? gallery.image} />
                                <InputError message={ errors.image} className="mt-2" />
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
