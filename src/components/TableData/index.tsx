import { HiPencil, HiEye, HiTrash, HiPlus, HiSearch } from "react-icons/hi";
import Pagination from '../../pages/Dashboard/Pagination';
import { useLocation } from "react-router-dom";

type TableDataType = {
  showModalForm: boolean,
  setShowModalForm: (val: boolean) => void,
  setShowModal: (val: boolean) => void,
  setShowModalConfirm: (val: boolean) => void,
  data: any,
  fetchRuas: (val: any) => void,
  fetchGetOneRuas: (val: any) => void,
  setSelectedData: (val: object) => void,
  unitKerja: Array<any>,
  setStatus: (val: string) => void,
  setPerpage: (val: number) => void,
}

export default function TableData(props: TableDataType) {
  const location = useLocation()
  const findUnitKerja = (unit_id : number) => {
    const found = props.unitKerja.find((item) => item.id === unit_id)
    return found
  }
 
  const numbers: Array<number> = []
  let start = props.data.from - 1
  for (let index = 0; index < props.data.per_page; index++) {
    start++
    numbers.push(start)
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {location.pathname === '/master-data' && (
        <div className="flex justify-end gap-5">
          <button
            type='button'
            className='flex justify-center items-center gap-1 rounded-md text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            <HiSearch className="inline h-8 w-8 text-gray-900 hover:text-blue-600" />
          </button>
          <button
            type="button"
            onClick={() => {
              props.setStatus('create')
              props.setShowModalForm(true)
            }}
            className="flex justify-center items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <HiPlus className="inline h-5 w-5 text-gray-900 bg-white rounded" /> Tambah
          </button>
        </div>
      )}
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      No
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">
                      Ruas
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Lokasi
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Foto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Document
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Unit Kerja
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    {location.pathname === '/master-data' && (
                      <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                        Aksi
                      </th>
                    )}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {props?.data?.data?.map((item: any, index: number) => (
                    <tr key={numbers[index]} className='text-center'>
                      <td className=" whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {numbers[index]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.ruas_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.km_awal} s/d {item.km_akhir}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button 
                          onClick={() => {
                            props.setShowModal(true)
                            props.setSelectedData(item)
                          }}
                          className='px-4 py-1 bg-blue-100 rounded font-bold'>
                          Lihat
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a
                          href={item.doc_url}
                          rel={'noopener'}
                          className='px-4 py-1 bg-blue-100 rounded font-bold'>
                          Download
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{findUnitKerja(item.unit_id)?.unit}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.status === '1' ? 'Aktif' : 'Tidak Aktif'}</td>
                      {location.pathname === '/master-data' && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <HiPencil
                            onClick={() => {
                              props.setStatus('edit')
                              props.fetchGetOneRuas(item.id)
                              props.setShowModalForm(true)
                            }}
                            className="inline h-5 w-5 text-gray-600 hover:text-blue-500" />
                          <HiEye
                            onClick={() => {
                              props.setStatus('read')
                              props.fetchGetOneRuas(item.id)
                              props.setShowModalForm(true)
                            }}
                            className="inline h-5 w-5 mx-2.5 text-gray-600 hover:text-blue-500" />
                          <HiTrash
                            onClick={() => {
                              props.fetchGetOneRuas(item.id)
                              props.setShowModalConfirm(true)
                            }}
                            className="inline h-5 w-5 text-gray-600 hover:text-red-600" />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination 
        data={props.data}
        fetchRuas={props.fetchRuas}
        setPerPage={props.setPerpage}
      />
    </div>
    
  )
}
