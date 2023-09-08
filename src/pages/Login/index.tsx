import { useEffect , useState, useContext} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { authService } from "../../services/auth"
import { useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from 'typescript-cookie'
import Alert from '../../components/Alert';
import { GlobalContext } from '../../context/GlobalContext';

type Inputs = {
  username: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState<boolean>()
  const token = getCookie('token') || ''

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await authService.login(data)
      if (res.status) {
        const expired = res.expires_in / (3600 * 24);
        setCookie('token', res.access_token, { expires: expired })
        navigate('/dashboard')
      }
    } catch (error) {
      setShowAlert(true)
      console.log(error)
    }
  }
  useEffect(() => {
    if (token !== '')
      navigate('/')
  }, [token])
  
  return (
    <div className="bg-blue-100 min-h-screen grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="p-8 lg:p-48 flex flex-col justify-between gap-8">
        <div className="h-28">
          <img className="w-full h-full" 
          src="/images/pt-jasa-marga.jpg" />
        </div>
        {showAlert && <Alert type='error' message='Username or password wrong' callback={() => setShowAlert(false)} />}
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-end">
          <div className="mb-6 w-full">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              {...register("username", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.username && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.password && <span className="text-red-600 text-sm">This field is required</span>}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-full h-full hidden md:block">
        <img
          className="w-full h-full"
          src={`https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?w=1060&t=st=1693988766~exp=1693989366~hmac=cf1e8a70c00bf9588428e61f3c60e3857713d3ae0c4f3c53f74e661af3a5d9be`} />
      </div>
    </div>
  )
}
