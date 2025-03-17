import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { AcademicCalendar, AcademicCalendarForm } from "./type";
import { PageProps } from "@/types";

type AcademicCalendarProps = {
    academic_calendar: AcademicCalendar
}

export default function Page({academic_calendar}: PageProps<AcademicCalendarProps>): ReactNode {

    const [preview, setPreview] = useState<string|undefined>(undefined)

    const { data, setData, put, processing, errors, reset } = useForm<AcademicCalendarForm>({
        year_academic: academic_calendar.year_academic,
        image: null,
    })

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('operator.academic-calendars.update', academic_calendar.id));
    }

    return(
        <>
        <Head title="Form Galeri" />
        <AdministratorLayout data={menus('academic-calendars')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('operator.academic-calendars')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="year-academic"> Tahun Ajaran </Label>
                                <Input
                                    id="year-academic"
                                    type="text"
                                    className="mt-2"
                                    value={data.year_academic}
                                    placeholder="Ex:2024/2025;"
                                    onChange={(e) => setData('year_academic', e.target.value)}
                                    required
                                />
                                <InputError message={errors.year_academic} className="mt-2" />
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
                                <img className="mt-3 w-2/6" src={preview ?? academic_calendar.image} />
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
