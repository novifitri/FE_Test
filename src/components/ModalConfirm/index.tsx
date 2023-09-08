import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from "react-icons/hi";

type ModalType = {
  setShowModalConfirm: (val: boolean) => void,
  showModalConfirm: boolean,
  selectedData: any,
  deleteRuas: (val: string) => void,
}

export default function ModalConfirm(props: ModalType) {

  return (
    <Transition.Root show={props.showModalConfirm} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setShowModalConfirm}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:m-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => props.setShowModalConfirm(false)}
                  >
                    <span className="sr-only">Close</span>
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center sm:justify-center">
                  <div className="mt-3 text-center sm:mx-5 sm:mt-0 flex-1">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                      Konfirmasi Hapus Ruas
                    </Dialog.Title>
                    <div className="mt-2 p-4">
                      <p>Apakah Anda yakin ingin menghapus data Ruas 2?</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => props.deleteRuas(props?.selectedData?.id)}
                    className="inline-flex w-full justify-center rounded-md bg-white text-gray-900 px-3 py-2 text-sm font-semibold shadow-sm hover:outline hover:outline-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    
                  >
                    Ya
                  </button>
                  <button
                    type="button"
                    onClick={() => props.setShowModalConfirm(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 text-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-400 sm:col-start-1 sm:mt-0"
                  >
                    Tidak
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
