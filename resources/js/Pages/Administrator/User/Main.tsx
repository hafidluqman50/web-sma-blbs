import AdministratorLayout from "@/Layouts/Administrator/Layout";
import { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Head, Link, router, usePage } from "@inertiajs/react";
import { menus } from "../sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "./type";
import { PageProps, PaginationData } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Swal, { SweetAlertResult } from 'sweetalert2'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dayjs from 'dayjs';
import 'dayjs/locale/id'

interface Users {
    data:Array<User>;
    links:Array<PaginationData>;
}

type UserProps = {
    users:Users
}

export default function Page({users, page_num}: PageProps<UserProps>): ReactNode {

    dayjs.locale('id')

    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const deletePrompt = (id: number) => {
        Swal.fire({
            title: "Yakin Hapus Data Guru?",
            showDenyButton: true,
            confirmButtonText: "Hapus",
            denyButtonText: `Batal`
        }).then((result: SweetAlertResult) => {
            if(result.isConfirmed) {
                router.delete(route('administrator.users.delete', id))
            }
        })
    }

    const { session } = usePage<PageProps>().props

    return(
        <>
            <Head title="Data User" />
            <AdministratorLayout data={menus('users')}>
                {
                    session.success && (
                    <Alert id="alert-success" className="mb-5 flex" variant="success">
                        <div className="w-full grow">
                            <AlertTitle>Berhasil !</AlertTitle>
                            <AlertDescription>
                            {session.success}
                            </AlertDescription>
                        </div>
                        <div className="flex-none">
                            <Button className="justify-content-end" onClick={() => {
                                session.success = null

                                setIsDelete(!isDelete)
                            }} variant="ghost">X</Button>
                        </div>
                    </Alert>
                )}
            <div className="flex">
                    <Link href={route('administrator.users.create')}>
                        <Button className="bg-sky-600 hover:bg-sky-800 m-2">
                            Tambah Data
                        </Button>
                    </Link>
                    <Input
                        type="search"
                        name="search"
                        placeholder="Cari Nama Pengguna"
                        className="w-1/2 mt-2"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <Button className="m-2" onClick={() => {
                        router.get(route('administrator.users', {
                            search
                        }))
                    }}>Cari</Button>
            </div>
            <Table className="mt-2">
                <TableHeader>
                <TableRow>
                    <TableHead className="border border-slate-200">No.</TableHead>
                    <TableHead className="border border-slate-200">Nama</TableHead>
                    <TableHead className="border border-slate-200">Email</TableHead>
                    <TableHead className="border border-slate-200">#</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        users.data.length == 0 ?
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                Empty Data!
                            </TableCell>
                        </TableRow> :
                        users.data.map((row, key) => (
                            <TableRow key={key}>
                                <TableCell className="border border-slate-200">
                                    {page_num+key}
                                </TableCell>
                                <TableCell className="border border-slate-200">
                                    {row.name}
                                </TableCell>
                                <TableCell className="border border-slate-200">
                                    {row.email}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-4">
                                        <Button className="bg-amber-500 text-white hover:bg-amber-500" asChild>
                                            <Link href={route('administrator.users.edit', row.id)}><Pencil /></Link>
                                        </Button>
                                        <Button variant='destructive' onClick={() => deletePrompt(row.id)}>
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell className="border border-slate-200" colSpan={5}>
                        <Pagination>
                            <PaginationContent>
                            {
                                users.links.map((pagination, key) => (
                                    <div key={key}>
                                    {
                                        pagination.label.includes('Previous') ?
                                        <Link href={pagination.url === undefined ? '#' : pagination.url}>
                                            <PaginationPrevious/>
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
                                            <PaginationNext/>
                                        </Link> : ''
                                    }
                                    </div>
                                ))
                            }
                            </PaginationContent>
                        </Pagination>
                    </TableCell>
                </TableRow>
                </TableFooter>
            </Table>
            </AdministratorLayout>
        </>
    )
}
