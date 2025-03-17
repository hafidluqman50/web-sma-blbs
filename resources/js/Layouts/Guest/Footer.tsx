import {Link} from '@inertiajs/react'
import logoSmkN7Samarinda from '@/assets/sma.png'
import { motion } from 'framer-motion'

export default function FooterLayout() {
    return(
      <footer className="relative bg-sky-600 pt-8 pb-6 text-white font-montserrat">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <motion.div className="w-full lg:w-1/4 px-4 flex justify-center" whileTap={{scale:1.1}}>
                <img className="h-12 w-auto ml-2 sm:mb-6" src={logoSmkN7Samarinda} alt="" />
            </motion.div>
            <div className="w-full lg:w-9/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full mt-5 lg:mt-0 md:mt-0 sm:mt-0 lg:w-4/12 px-4">
                    <hr className="py-2 border-lightBlue-700" />
                  <span className="block uppercase text-sm font-semibold mb-2">
                    LINK TERKAIT
                  </span>
                  <hr className="my-6 border-lightBlue-700" />
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://www.kemdikbud.go.id/"
                        target="_blank"
                      >
                        KEMDIKBUDRISTEK
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://web.disdikbud.kaltimprov.go.id/"
                        target="_blank"
                      >
                        DINAS PENDIDIKAN PROVINSI KALIMANTAN TIMUR
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://disdik.samarinda.go.id"
                        target="_blank"
                      >
                        DINAS PENDIDIKAN KOTA SAMARINDA
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://nisn.data.kemendikbud.go.id"
                        target="_blank"
                      >
                        NOMOR INDUK SISWA NASIONAL
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://dapo.kemendikbud.go.id"
                        target="_blank"
                      >
                        DAPODIKMEN
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full mt-5 lg:mt-0 lg:w-4/12 px-10">
                    <hr className="py-2 border-lightBlue-700" />
                  <span className="block uppercase text-sm font-semibold mb-2">
                    APLIKASI TERKAIT
                  </span>
                  <hr className="my-6 border-lightBlue-700" />
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://e-library.sma-blbs-smr.sch.id"
                        target="_blank"
                      >
                          E-LIBRARY
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full mt-5 lg:mt-0 lg:w-4/12 px-4">
                    <hr className="py-2 border-lightBlue-700" />
                  <span className="block uppercase text-sm font-semibold mb-2">
                    MEDIAL SOSIAL
                  </span>
                  <hr className="my-6 border-lightBlue-700" />
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://instagram.com/smablsamarinda"
                        target="_blank"
                      >
                        INSTAGRAM
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://facebook.com/p/SMA-Budi-Luhur-Samarinda-100087376814291/"
                        target="_blank"
                      >
                        FACEBOOK
                      </a>
                    </li>
                    <li>
                      <a
                        className="block pb-2 text-sm"
                        href="https://youtube.com/@smabudiluhursamarinda9794"
                        target="_blank"
                      >
                        YOUTUBE
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-lightBlue-700" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm font-semibold py-1">
                Copyright © {new Date().getFullYear()} SMA Budi Luhur Samarinda {" "}<br/>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}
