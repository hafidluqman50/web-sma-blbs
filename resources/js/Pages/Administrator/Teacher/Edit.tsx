import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useState } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { Teacher, TeacherForm } from "./type";
import { Textarea } from "@/components/ui/textarea";
import { PageProps } from "@/types";

type TeacherProps = {
    teacher: Teacher
}

export default function Page({teacher}: PageProps<TeacherProps>): ReactNode {

    const [preview, setPreview] = useState<string|undefined>(undefined)

    const { data, setData, post, processing, errors, reset } = useForm<TeacherForm>({
        name: teacher.name,
        image: null,
        position: teacher.position
    })

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        router.post(route('administrator.teachers.update', teacher.id), {
            _method:'PUT',
            ...data
        });
    }

    return(
        <>
        <Head title="Form Data Guru" />
        <AdministratorLayout data={menus('teachers')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('administrator.teachers')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="name"> Nama Guru </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="mt-2"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="position"> Posisi Guru </Label>
                                <Input
                                    id="position"
                                    type="text"
                                    className="mt-2"
                                    value={data.position}
                                    placeholder="Ex:Guru Matematika;"
                                    onChange={(e) => setData('position', e.target.value)}
                                    required
                                />
                                <InputError message={errors.position} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="image"> Gambar </Label>
                                <Input
                                    id="image"
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
                                <img className="mt-3 w-2/6" src={preview ?? teacher.image} />
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
