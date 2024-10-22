import { useContext, useEffect, useState } from "react"
import img from "../../assets/profile.png"
import "./profile.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import {API_BASE_URL, config} from "../../apiConfig";

export default function Profile (){
    const [isUpdate, setIsUpdate] = useState(false)
    const {getToken}= useContext(AuthContext)
    const userToken = getToken()
    const [user, setUser]= useState({})
    
    useEffect(()=>{
        axios.post(`${API_BASE_URL}/user/`,{},{
            headers:{
                'Authorization':`Token ${userToken}`,
                'Content-Type':'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        }).then(response =>setUser(response.data))
        
    },[])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleClickIsUpdate = (e) => {
        e.preventDefault()
        setIsUpdate(true)
    }
    const handleClickUpdate = (e) => {
        try {
            e.preventDefault()
        setIsUpdate(false)
        axios.patch(`${API_BASE_URL}/passenger/${user.id}/`,user, config)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        
        <div className="profile-header">
            <div className="container">
                <div className="row ">
                    <div className="col-12 col-sm-3 col-md-6">
                        <img src={img} alt="Photo de Profil"></img>
                        <h1 className="display-6 fw-bold">{user.last_name+" "+user.first_name}</h1>
                    </div>
                    <div className={`col-12 col-sm-9 col-md-6 d-flex flex-column justify-content-evenly `}>
                        {
                            isUpdate ? <>
                            <label htmlFor="first_name">First name </label>
                            <input className="form-control" type="text" id="first_name" name="first_name"
                            value={user.first_name}
                            onChange={(e) =>{handleChange(e)}}
                            ></input>
                            <label htmlFor="last_name">Last name </label>
                            <input type="text" id="last_name" name="last_name" className="form-control"
                            value={user.last_name}
                            onChange={(e) =>{handleChange(e)}}
                            ></input>
                            <label htmlFor="email">Email </label>
                            <input type="text" id="email" name="email" className="form-control"
                            value={user.email}
                            onChange={(e)=>{handleChange(e)}}
                            ></input>
                            <input className="btn btn-success w-50 m-auto" type="submit" value="Modifier" onClick={(e)=>{handleClickUpdate(e)}}></input>
                            </>:
                            <>
                                <p>Name : {user.first_name} {user.last_name}</p>
                                <p>Email : {user.email}</p>
                                <input  onClick={(e)=>{handleClickIsUpdate(e)}} className="btn btn-success w-50 m-auto" value="Modifier"></input>
                            </>
                        }
                                
                    </div>
                </div>
            </div>
        </div>
       
    )
}