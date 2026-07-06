import { useForm, type FieldErrors } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { sileo } from 'sileo'
import { RegisterDoctorSchema, type RegisterDoctor } from '../../Types/dataTypes'
import { useRegisterDoctor } from '../../Hooks/useAuth'
import { Link } from 'react-router-dom'


export default function RegisterDoctor() {

  const { register, handleSubmit, reset } = useForm<RegisterDoctor>({
    resolver: valibotResolver(RegisterDoctorSchema)
  })

  const { mutate: registerDoctor, isPending, error } = useRegisterDoctor()

  const onSubmit = (data: RegisterDoctor) => {
    registerDoctor(data)
    reset()
  }

  const onError = (errors: FieldErrors<RegisterDoctor>) => {
    if (errors.name) {
      sileo.error({ title: "Error in Name", fill: "black", description: errors.name.message, duration: 5000 })
    }
    if (errors.mail) {
      sileo.error({ title: "Error in Email", fill: "black", description: errors.mail.message, duration: 5000 })
    }
    if (errors.password) {
      sileo.error({ title: "Error in Password", fill: "black", description: errors.password.message, duration: 5000 })
    }
    if (errors.secretCode) {
      sileo.error({ title: "Error in Secret Code", fill: "black",styles:({description:"text-while!"}), description: errors.secretCode.message, duration: 5000 })
    }
  }

  return (
    <>
      <div className="mx-auto w-6/15 mt-30 p-8 rounded-2xl shadow-lg bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">Register as Doctor</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4">

          <div className='flex items-center flex-col gap-4'>
            <label className='text-sm font-medium'>Username</label>
            <input
              {...register('name')}
              placeholder='Your Name'
              type="text"
              className='border rounded-lg px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className='flex flex-col items-center gap-4'>
            <label>Email</label>
            <input
              type="email"
              {...register('mail')}
              placeholder="your@email.com"
              className='border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className="flex items-center flex-col gap-4">
            <label className="text-sm font-medium">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Password of 6 characters"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <label className="text-sm font-medium">Secret code</label>
            <input
              {...register("secretCode")}
              type="password"
              placeholder="Enter the doctor secret code"
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error.message}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isPending ? "Registering..." : "Register as Doctor"}
          </button>

        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/doctor/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </>
  )
}
