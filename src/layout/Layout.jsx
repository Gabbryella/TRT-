import {  Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/header";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Layout(){
    const {isAuthenticated} = useContext(AuthContext)
    return (
        <>{
            isAuthenticated ? <>
            <Header/>
                
                    <Outlet/>
               
            </>:
            <>
            <Navigate to='sign-up'/>
            </>
        }
        </>
        
    )
}