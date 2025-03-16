import GuestLayout from "@/Layouts/Guest/Layout";
import { PageProps, PaginationData } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ReactNode } from "react";
import { AcademicCalendar } from "../type";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

interface AcademicCalendars {
    data:Array<AcademicCalendar>;
    links:Array<PaginationData>;
}

type AcademicCalendarProps = {
    academic_calendars:AcademicCalendars
}

export default function Page({academic_calendars, page_num}: PageProps<AcademicCalendarProps>): ReactNode {
    return(
        <>
            <Head title="Data Kalender Akademik" />
            <GuestLayout>
                <section id="academic-calendar" className="relative isolate py-40 px-5 pb-5 lg:pb-2 md:pb-3 lg:px-10 min-h-screen sm:py-40 font-outfit">
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
                            <Link href={route('guest.academic-calendars')}>
                                Kalender Akademik
                            </Link>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col justify-items-center items-center">
                        <div className="w-full mb-5">
                            <p className="text-xl font-outfit text-center">
                                KALENDER AKADEMIK
                            </p>
                            <hr className="mt-2 border-1 border-sky-500 mb-5" />
                        </div>
                        <div className="flex flex-col justify-items-center items-center w-full">
                            <Table className="mt-2">
                                <TableHeader>
                                <TableRow>
                                    <TableHead className="border border-slate-200">No.</TableHead>
                                    <TableHead className="border border-slate-200">Tahun Ajaran</TableHead>
                                    <TableHead className="border border-slate-200">#</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        academic_calendars.data.length == 0 ?
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                Empty Data!
                                            </TableCell>
                                        </TableRow> :
                                        academic_calendars.data.map((row, key) => (
                                            <TableRow key={key}>
                                                <TableCell className="border border-slate-200">
                                                    {page_num+key}
                                                </TableCell>
                                                <TableCell className="border border-slate-200">
                                                    {row.year_academic}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-4">
                                                        <a href={row.image} target="_blank">
                                                            <Button className="bg-amber-500 text-white hover:bg-amber-500">
                                                                Lihat Gambar
                                                            </Button>
                                                        </a>
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
                                                academic_calendars.links.map((pagination, key) => (
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
                        </div>
                    </div>
                </section>
            </GuestLayout>
        </>
    )
}
