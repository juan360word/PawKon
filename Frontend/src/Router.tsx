import {createBrowserRouter} from 'react-router-dom'
import MainLayout from './pages/Layouts/MainLayout'
import Home from './pages/Home'
import Adoption  from './pages/Adoption'
import Protected from './Routers/Protected'
import Appointments from './pages/Appointments'
import DoctorPanel from './pages/DoctorPanel'
import Doctor from './Routers/Doctor'
import AuthLayout from './pages/Layouts/AuthLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import LoginDoctor from './pages/Auth/LoginDoctor'
import RegisterDoctor from './pages/Auth/RegisterDoctor'
import NotFound from './pages/NotFound404'


//paginas 



 export const Router = createBrowserRouter([
    {
       element:<MainLayout/>,
       children:[
        {
            path:'/',
            element: <Home/>,
            index:true
            
        },
        {
            path:'/adoption',
            element:<Adoption/>
        },
        {
            element:<Protected/>,
            children:[
                {
                    path:'/appointments',
                    element:<Appointments/>
                }
            ]
        },
        {
            element:<Doctor/>,
            children:[
                {
                    path:'/doctor',
                    element:<DoctorPanel/>
                }
            ]
        }

       ]

    },
    {
     element:<AuthLayout/>,
     children:[
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'/doctor/login',
            element:<LoginDoctor/>
        },
        {
            path:'/doctor/register',
            element:<RegisterDoctor/>
        }
     ]
    },
    {
    path: "*",
    element: <NotFound />,
    }
    
 ])