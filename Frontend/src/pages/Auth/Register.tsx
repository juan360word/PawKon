import {useForm, type FieldErrors} from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { sileo } from 'sileo'
import { useRegister } from '../../Hooks/useAuth'
import { RegisterSchema, type RegisterUser } from '../../Types/dataTypes'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'



export default function Register() {

  const { t } = useTranslation()
  const {register,handleSubmit,reset} = useForm<RegisterUser>({resolver:valibotResolver(RegisterSchema)})
  const {mutate: RegisterUse,isPending,error} = useRegister()
  const navigate = useNavigate()
 
  const onSubmit = (data:RegisterUser) => {
        sileo.success({
          title:'Registration Successful',
          fill:"black",
          duration:4500,
        })
        RegisterUse(data)
        reset()
        navigate('/login')
        
  }

  const onError = (errors: FieldErrors<RegisterUser>) => {
    if(errors.mail){
        sileo.error({
          title:"Error in Email",
          fill:"black",
          styles:({
            description:'text-white!'
          }),
          description:errors.mail.message,
          duration:5000,
        })
    }
    if(errors.password){
      sileo.error({
          title:"Error in Password",
          fill:"black",
          styles:({
            description:'text-white!'
          }),
          description:errors.password.message,
          duration:5000,
        })
    }
    if(errors.name){
      sileo.error({
          title:"Error in Name",
          fill:"black",
          styles:({
            description:'text-white!'
          }),
          description:errors.name.message,
          duration:5000,
        })
    }
    

  }

  return (
   <>
    <div className="mx-auto w-full md:w-6/15 mt-10 md:mt-30 px-4 py-6 md:p-8 rounded-2xl shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">{t("auth.createAccount")}</h1>

      <form onSubmit={handleSubmit(onSubmit,onError)} className="flex  flex-col gap-4">

      <div className='flex items-center flex-col gap-4'>
        <label className='text-sm  font-medium'>{t("auth.name")}</label>
        <input
        {...register('name')}
        placeholder='your Name'
        type="text"
        className=' border rounded-lg px-4 py-1 outline-none focus:ring-2 focus:ring-blue-400 '
         />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <label htmlFor="">{t("auth.email")}</label>


          <input type="email"
          {...register('mail')}
          placeholder="your@email.com"
          className='border  rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400'
          />
      </div>

      <div className="flex items-center flex-col gap-4">
          <label className="text-sm font-medium">{t("auth.password")}</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password of 6 characters "
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
          {isPending ? t("auth.loggingIn") : t("auth.registerButton")}
        </button>


      </form>

      <p className="text-center text-sm mt-4">
        {t("auth.hasAccount")}{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          {t("auth.loginHere")}
        </Link>
      </p>
    </div>
   </>
  )
}
