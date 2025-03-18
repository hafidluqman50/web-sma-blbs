import { Fragment, useState } from 'react'
import { Link, usePage } from '@inertiajs/react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'

import {
  Popover as PopoverShadcn,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import dayjs from 'dayjs'
import 'dayjs/locale/id'

const profile = [
  { name: 'SEJARAH SINGKAT', href: '/about-us/sejarah-singkat', child:[] },
  { name: 'PENGEMBANGAN', href: '/about-us/pengembangan', child:[] },
  { name: 'VISI DAN MISI', href: '/about-us/visi-dan-misi', child:[] },
  { name: 'PROGRAM KEAHLIAN', href: '/about-us/program-keahlian', child:[] },
  { name: 'KONSENTRASI KEAHLIAN', href: '#', child:[
      {
        name:'ANIMASI', href: '/about-us/animasi'
      },
      {
        name:'DESAIN KOMUNIKASI VISUAL', href: '/about-us/desain-komunikasi-visual'
      },
      {
        name:'PENGEMBANGAN PERANGKAT LUNAK DAN GIM', href: '/about-us/pengembangan-perangkat-lunak-dan-gim'
      },
      {
        name:'TEKNIK JARINGAN KOMPUTER DAN TELEKOMUNIKASI', href: '/about-us/teknik-jaringan-komputer-dan-telekomunikasi'
      },
  ]},
  { name: 'KARAKTERISTIK PROGRAM', href: '/about-us/karakteristik-program', child:[] },
  { name: 'PROFIL PIMPINAN', href: '/about-us/profile-pimpinan', child:[] },
  { name: 'SARANA PRASARANA', href: '/about-us/sarana-prasarana', child:[] }
]

const schoolProgram = [
    { name: 'PROGRAM KERJA', href:'/about-us/program-kerja' },
    { name: 'PERATURAN-PERATURAN PERMENDIKBUD', href:'/about-us/peraturan-peraturan-permendikbud' },
    { name: 'HUBUNGAN INDUSTRI', href:'/about-us/hubungan-industri' },
    { name: 'TEACHING FACTORY DAN PROGRAM INOVASI', href:'/about-us/teaching-factory-dan-program-inovasi' },
    { name: 'PROGRAM BUSSINESS CENTER (UNIT PRODUKSI)', href:'/about-us/program-bussiness-center-unit-produksi' },
    { name: 'PROGRAM PENGEMBANGAN SEKOLAH', href:'/about-us/program-pengembangan-sekolah' },
    { name: 'PROGRAM SPW', href:'/about-us/program-spw' },
]

const academic = [
    { name: 'BERITA', href: route('guest.articles') },
    { name: 'KALENDER AKADEMIK', href: route('guest.academic-calendars') },
    // { name: 'KEGIATAN', href: '/events' },
    // { name: 'JADWAL', href: '/schedule' },
    { name: 'DATA GURU', href: route('guest.teachers') },
]

import logoSmaBlbs from '@/assets/sma.png'
import logoSmpBlbs from '@/assets/smp.png'

import { PageProps } from '@/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function HeaderLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [subMenuOpen, setSubMenuOpen]       = useState(false)

  const closeMenu = (param: string) => {
    if(param == 'both') {
        setMobileMenuOpen(false)
        setSubMenuOpen(false)
    }
    else if(param == 'mobileMenu') {
        setMobileMenuOpen(false)
    }
    else if(param == 'subMenu') {
        setSubMenuOpen(false)
    }
  }

  dayjs().locale('id').format()

  const { management_menu } = usePage<PageProps>().props

  const hostName = window.location.hostname == 'smp-blbs-smr.sch.id' ? window.location.hostname : 'sma-blbs-smr.sch.id'

  const classHostName = [
      {
          host: 'smp-blbs-smr.sch.id',
          className: "bg-emerald-600",
          logo: logoSmpBlbs,
          text: 'SMP Budi Luhur Samarinda'
      },
      {
          host: 'sma-blbs-smr.sch.id',
          className: "bg-sky-600",
          logo: logoSmaBlbs,
          text: 'SMA Budi Luhur Samarinda'
      }
  ]

  const getClassHostName = classHostName.find(({host}) => host === hostName)

  return (
    <header className={`${getClassHostName!.className} font-montserrat opacity-1 fixed top-0 z-10 w-full text-white`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center gap-2">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{getClassHostName!.text}</span>
            <img className="h-12 w-auto" src={getClassHostName!.logo} alt="SMA Budi Luhur Samarinda Logo" />
          </Link>
          <p className='font-semibold'>{getClassHostName!.text}</p>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-semibold leading-6">PROFIL</DropdownMenuTrigger>
          <DropdownMenuContent>
            {
                management_menu.profil.map((data, index) => {
                    return(
                        <Link href={data.href} key={data.name}>
                            <DropdownMenuItem className="text-sm font-normal leading-6 font-montserrat" key={data.href}>
                                {data.name}
                            </DropdownMenuItem>
                        </Link>
                    )
                })
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-semibold leading-6 font-montserrat">PROGRAM SEKOLAH</DropdownMenuTrigger>
          <DropdownMenuContent>
            {
                management_menu.school_program.map((data, index) => {
                    return(
                        <Link href={data.href} key={data.name}>
                            <DropdownMenuItem className="text-sm font-normal leading-6 font-montserrat">
                                {data.name}
                            </DropdownMenuItem>
                        </Link>
                    )
                })
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-sm font-semibold leading-6 font-montserrat">AKADEMIK</DropdownMenuTrigger>
          <DropdownMenuContent>
            {
                academic.map((data, index) => {
                    return(
                        <Link href={data.href} key={data.name}>
                            <DropdownMenuItem className="text-sm font-normal leading-6 font-montserrat">
                                {data.name}
                            </DropdownMenuItem>
                        </Link>
                    )
                })
            }
          </DropdownMenuContent>
        </DropdownMenu>
          <Link href={route('guest.galleries')} className="text-sm font-semibold leading-6">
            GALERI
          </Link>
          <Link href="/our-contact" className="text-sm font-semibold leading-6">
            KONTAK KAMI
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden font-montserrat" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => closeMenu('both')}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 hover:bg-gray-50">
                        PROFIL
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...management_menu.profil].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Link href={item.href} onClick={() => closeMenu('both')}>{item.name}</Link>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 hover:bg-gray-50">
                        PROGRAM SEKOLAH
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...management_menu.school_program].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Link href={item.href} onClick={() => closeMenu('both')}>{item.name}</Link>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 hover:bg-gray-50">
                        AKADEMIK
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...academic].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="div"
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            <Link href={item.href} onClick={() => closeMenu('both')}>{item.name}</Link>
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href={route('guest.galleries')}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-gray-50"
                  onClick={() => closeMenu('both')}
                >
                  GALERI
                </Link>
                <Link
                  href="/our-contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-gray-50"
                  onClick={() => closeMenu('both')}
                >
                  KONTAK KAMI
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
