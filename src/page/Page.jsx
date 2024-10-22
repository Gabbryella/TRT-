import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Error from "../components/error/Error"
import Home from "../components/home/Home"
import SignIn from "../components/login/SignIn"
import SignUp from "../components/login/SignUp"
import Profile from "../components/profile/Profile"
import Journey from "../components/journey/Journey"
import ReservationList from "../components/reservation/reservationList"
import ContactUs from "../components/contact/ContactsUs.jsx"

export default function Page(){
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Layout/>,
            errorElement:<Error/>,
            children:[
                {
                    index:true,
                    element:<Home/>,
                },
                {
                    path:"profile",
                    element:<Profile/>
                },
                {
                    path:"journey",
                    element:<Journey/>
                },
                {
                    path:"booking",
                    element:<ReservationList/>
                },
                {
                    path:"contact",
                    element:<ContactUs/>
                }

            ]

        },
        {
            path:"sign-in",
            element:<SignIn/>
        },
        {
            path:"sign-up",
            element:<SignUp/>
        }
       
    ])
    return (
       <><RouterProvider router={router}/></>
    )
}