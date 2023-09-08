import TableData from '../../components/TableData'
import { useState, useEffect } from 'react'
import { dashboardService } from '../../services/dashboard'
import { getCookie } from 'typescript-cookie'
import MyChart from './MyChart'
import Modal from '../../components/Modal'
import Alert from '../../components/Alert'
import { authService } from '../../services/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalForm, setShowModalForm] = useState<boolean>(false)
  const [showModalConfrim, setShowModalConfirm] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<any>(null)
  const [data, setData] = useState<any>([])
  const [allRuas, setAllRuas] = useState<any>([])
  const [status, setStatus] = useState<string>('')
  const [unitKerja, setUnitKerja] = useState([])
  const [perPage, setPerpage] = useState<number>(5)
  const navigate = useNavigate()
  const [token, setToken] = useState(getCookie('token') || '')
  const fetchRuas = async (per_page = 5, page = 1) => {
    try {
      const res = await dashboardService.getAllRuas({ per_page, page }, token)
      if (res.data) {
        setData(res)
      }
    } catch (error) {
      console.log(error)
      setShowAlert(true)
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
      setShowAlert(true)
    }
  }
  const fethAll = async (per_page = 100, page = 1) => {
    try {
      const res = await dashboardService.getAllRuas({ per_page, page }, token)
      if (res.data) {
        setAllRuas(res)
      }
    } catch (error) {
      console.log(error)
      setShowAlert(true)
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
      setShowAlert(true)
    }
  }
  const logout = () => {
    authService.logout()
    navigate('/login')
  }
  useEffect(() => {
    if (token !== '') {
      fetchRuas()
      fethAll()
      fetchUnitKerja()
    }
  }, [token])
  return (
    <>
      <div>
        {showAlert && <Alert type='error' message='Session ended, you need to login again' callback={logout} />}
        {allRuas.data?.length > 0 && unitKerja?.length > 0 && <MyChart unitKerja={unitKerja} ruas={allRuas.data} />}
        <h1 className='px-8 text-2xl font-bold text-gray-900'>Dashboard</h1>
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
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedData={selectedData}
        />
      </div>
    </>
  )
}
