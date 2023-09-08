import TableData from '../../components/TableData'
import Modal from '../../components/Modal'
import { useState, useEffect } from 'react'
import { dashboardService } from '../../services/dashboard'
import ModalForm from '../../components/ModalForm'
import ModalConfirm from '../../components/ModalConfirm'
import { getCookie } from 'typescript-cookie'
import Loader from '../../components/Loader'

export default function MasterData() {
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [showModalConfrim, setShowModalConfirm] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<any>(null)
  const [data, setData] = useState<any>([])
  const [status, setStatus] = useState<string>('')
  const [unitKerja, setUnitKerja] = useState([])
  const token = getCookie('token') || ''
  const [perPage, setPerpage] = useState<number>(5)
  const fetchRuas = async (per_page= perPage, page = 1) => {
    try {
      const res = await dashboardService.getAllRuas({ per_page, page }, token)
      if (res.data) {
        setData(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchGetOneRuas = async (id: string) => {
    try {
      const res = await dashboardService.getOneRuas(id)
      if (res.data) {
        setSelectedData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUnitKerja = async () => {
    try {
      const res = await dashboardService.getUnitKerja(token)
      if (res.data) {
        setUnitKerja(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addRuas = async (data: object) => {
    try {
      setLoading(true)
      const res = await dashboardService.postRuas(data)
      if (res.status) {
        fetchRuas()
        setShowModalForm(false)
        alert("Ruas berhasil ditambah")
      }
    } catch (error) {
      console.log(error)
      alert("Ruas gagal ditambah")
    }finally{
      setLoading(false)
    }
  }
  
  const updateRuas = async (id:string, data: any) => {
    try {
      setLoading(true)
      const res = await dashboardService.updateRuas(id, data)
      if (res.status) {
        fetchRuas()
        setShowModalForm(false)
        alert("Ruas berhasil diubah")
      }
    } catch (error) {
      console.log(error)
      alert("Ruas gagal diubah")
    }
    finally {
      setLoading(false)
    }
  }
  const deleteRuas = async (id: string) => {
    try {
      setLoading(true)
      const res = await dashboardService.deleteRuas(id)
      if (res.status) {
        fetchRuas()
        setShowModalConfirm(false)
        alert("Ruas berhasil dihapus")
      }
    } catch (error) {
      console.log(error)
      alert("Ruas gagal dihapus")

    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (token !== '') {
      fetchRuas()
      fetchUnitKerja()
    }
  }, [token])

  return (
    <>
      <div>
        {loading && <Loader />}
        <h1 className='px-8 text-2xl font-bold text-gray-900'>Master Data</h1>
        <TableData
          showModalForm={showModalForm}
          setShowModalForm={setShowModalForm}
          setShowModal={setShowModal}
          setShowModalConfirm={setShowModalConfirm}
          data={data}
          fetchRuas={fetchRuas}
          fetchGetOneRuas={fetchGetOneRuas}
          setSelectedData={setSelectedData}
          unitKerja={unitKerja}
          setStatus={setStatus}
          setPerpage={setPerpage}
        />
        <ModalForm
          showModalForm={showModalForm}
          setShowModalForm={setShowModalForm}
          status={status}
          selectedData={selectedData}
          addRuas={addRuas}
          updateRuas={updateRuas}
          unitKerja={unitKerja}
        />
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedData={selectedData}
        />
        <ModalConfirm
          showModalConfirm={showModalConfrim}
          setShowModalConfirm={setShowModalConfirm}
          selectedData={selectedData}
          deleteRuas={deleteRuas}
        />
      </div>
    </>
  )
}
