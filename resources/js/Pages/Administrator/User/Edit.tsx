import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { FormEventHandler, ReactNode, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { User, UserForm } from "./type";
import dayjs from "dayjs";
import { Textarea } from "@/components/ui/textarea";
import { PageProps } from "@/types";

type UserProps = {
    user: User
}

export default function Page({user}: PageProps<UserProps>): ReactNode {

    const { data, setData, put, processing, errors, reset } = useForm<UserForm>({
        name: user.name,
        email: user.email,
        password: ''
    })

    const submitForm: FormEventHandler = (e) => {
        e.preventDefault()

        put(route('administrator.users.update', user.id));
    }

    return(
        <>
        <Head title="Form User" />
        <AdministratorLayout data={menus('users')}>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md sm:rounded-lg py-8 px-8">
                        <div className="border-b-2 mb-4 py-4 border-slate-200">
                            <Button variant="secondary" asChild>
                                <Link href={route('administrator.users')}>Kembali</Link>
                            </Button>
                        </div>
                        <form onSubmit={submitForm} method="POST">
                            <div className="form-group">
                                <Label htmlFor="name"> Nama User </Label>
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
                                <Label htmlFor="email"> Email </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-2"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="form-group mt-3">
                                <Label htmlFor="password"> Password </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-2"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={ errors.password} className="mt-2" />
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
