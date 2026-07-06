import {useForm} from 'react-hook-form'
import {valibotResolver} from '@hookform/resolvers/valibot'
import { Link } from 'react-router-dom'
import { useLogin } from '../../Hooks/useAuth'
import type { LoginUser } from '../../Types/dataTypes'
import { LoginSchema } from '../../Types/dataTypes'








export default function LoginDoctor() {

  const {register,handleSubmit,formState:{errors}} = useForm<LoginUser>({ resolver:valibotResolver(LoginSchema)})

  const {mutate:login,isPending,error} = useLogin()


  const onSubmit = (data:LoginUser) =>  {
    login(data)
  }

  return (
  <>

   <div className="mx-auto w-6/15 mt-50 p-8 rounded-2xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to PawKon</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            {...register("mail")}
            type="email"
            placeholder="your@email.com"
            className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.mail && (
            <span className="text-red-500 text-center text-sm">{errors.mail.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="••••••"
            className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-center text-sm">{errors.password.message}</span>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error.message}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

      </form>

      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/doctor/register" className="text-blue-500 ">
          Register here
        </Link>
      </p>
    </div>

  </>
  )
}