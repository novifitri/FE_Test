import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { HiX } from "react-icons/hi";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export type SetPropsType = {
  setShowModalForm: (val: boolean) => void,
  showModalForm: boolean,
  status: string,
  selectedData: any,
  addRuas: (val: object) => void,
  updateRuas: (id: string, val: any) => void,
  unitKerja: any
}
type Inputs = {
  ruas_name: string,
  unit_id: string,
  long: string,
  km_awal: string,
  km_akhir: string,
  status: string,
  file: any,
  photo: any
};
export default function ModalForm(props: SetPropsType) {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const form = new FormData();
    form.append('ruas_name', data.ruas_name);
    form.append('unit_id', data.unit_id);
    form.append('long', data.long);
    form.append('km_awal', data.km_awal);
    form.append('km_akhir', data.km_akhir);
    form.append('status', data.status);
    form.append('file', data.file);
    form.append('photo', data.photo);
    try {
      if (props.status === 'create') {
        await props.addRuas(form)
      } else {
        form.append('_method', 'PUT')
        await props.updateRuas(props?.selectedData?.id, form)
      }
    } catch (error) {
      console.log(error)
    }

  };
  console.log(props?.selectedData)
  useEffect(() => {
    if (props.status === 'create') {
      reset({
        ruas_name: "",
        long: "",
        km_awal: "",
        km_akhir: "",
        status: "",
        photo: "",
        file: ""
      })
    }
    else if (props.selectedData) {
      reset({
        ruas_name: props?.selectedData?.ruas_name,
        long: props?.selectedData?.long,
        unit_id: props?.selectedData?.unit_id,
        km_awal: props?.selectedData?.km_awal,
        km_akhir: props?.selectedData?.km_akhir,
        status: props?.selectedData?.status,
        // photo: props?.selectedData?.photo_url,
        // file: props?.selectedData?.doc_url
      })
    }
  }, [reset, props.selectedData, props.status])

  return (
    <Transition.Root show={props.showModalForm} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setShowModalForm}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-4xl sm:m-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => props.setShowModalForm(false)}
                  >
                    <span className="sr-only">Close</span>
                    <HiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-center sm:justify-center">
                  <div className="mt-3 text-center sm:mx-5 sm:mt-0 flex-1">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                      {props.status === 'create' ? "Tambah" : props.status === 'read' ? "Detail" : "Edit"} Ruas
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit(onSubmit)} className='text-left'>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="ruas" className="block text-sm font-medium leading-6 text-gray-900">
                              Ruas
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="ruas"
                                {...register("ruas_name", { required: true })}
                                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 bg-gray-50 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.ruas_name && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="long" className="block text-sm font-medium leading-6 text-gray-900">
                              Panjang (km)
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="long"
                                {...register("long", { required: true })}
                                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-gray-50 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.long && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="unit_id" className="block text-sm font-medium leading-6 text-gray-900">
                              Unit Kerja
                            </label>
                            <div className="mt-2">
                              <select
                                id="unit_id"
                                autoComplete="unit_id"
                                {...register("unit_id", { required: true })}
                                className="block w-full rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-gray-50 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                <option disabled>Choose unit kerja</option>
                                {props?.unitKerja?.map((item: any) => (
                                  <option key={item.id} value={item.id}>{item.unit}</option>
                                ))}
                              </select>
                              {errors.unit_id && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="km-awal" className="block text-sm font-medium leading-6 text-gray-900">
                              Km Awal
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="km-awal"
                                {...register("km_awal", { required: true })}
                                autoComplete="km-awal"
                                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-gray-50 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.km_awal && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                              Foto
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className='mt-2'>
                              <Controller
                                name='photo'
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { onChange, value },
                                }) => (
                                  <input
                                    className="relative block w-full py-2 px-2.5 text-sm text-gray-900 border file:absolute file:right-0 file:top-1/2 file:-translate-y-1/2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    id="foto"
                                    value={value?.fileName}
                                    type="file"
                                    accept='image/*'
                                    onChange={(e: any) => onChange(e?.target?.files[0])}
                                  />
                                )}
                              />
                              {errors.photo && <span className='text-red-600 text-sm'>This field is required</span>}

                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="km-akhir" className="block text-sm font-medium leading-6 text-gray-900">
                              Km Akhir
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="km-akhir"
                                autoComplete="km_akhir"
                                {...register("km_akhir", { required: true })}
                                className="block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 bg-gray-50 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.km_akhir && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="file" className="block text-sm font-medium leading-6 text-gray-900">
                              Dokumen
                              <span className='text-red-500 text-lg ml-1'>*</span>
                            </label>
                            <div className='mt-2'>
                              <Controller
                                name='file'
                                rules={{ required: true }}
                                control={control}
                                render={({
                                  field: { onChange, value },
                                }) => (
                                  <input
                                    className="relative block w-full py-2 px-2.5 text-sm text-gray-900 border file:absolute file:right-0 file:top-1/2 file:-translate-y-1/2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    id="file"
                                    type="file"
                                    value={value?.fileName}
                                    accept='.pdf, .doc, .docx, .pptx, .xlsx'
                                    onChange={(e: any) => onChange(e?.target?.files[0])}
                                  />
                                )}
                              />
                              {errors.file && <span className='text-red-600 text-sm'>This field is required</span>}

                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                              Status
                            </label>
                            <div className="mt-2">
                              <select
                                id="status"
                                autoComplete="status"
                                {...register("status", { required: true })}
                                className="block w-full rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-gray-50 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                <option disabled>Choose status</option>
                                <option value={1}>Aktif</option>
                                <option value={0}>Tidak Aktif</option>
                              </select>
                              {errors.status && <span className='text-red-600 text-sm'>This field is required</span>}
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                          {props.status !== 'read' ? (
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            >
                              Simpan
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => {
                              props.setShowModalForm(false)
                            }}
                          >
                            Batal
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
