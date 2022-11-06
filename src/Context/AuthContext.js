import React from 'react'
import { useEffect,createContext , useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext(null);
const { Provider } = AuthContext;

function AuthProvider({children}){

    const local = localStorage.getItem('token')
    // console.log("local", local)
    useEffect(() => {
      if(local !== null){
        fecthData();
      }
      fecthData(local);
    }, []);
  
      const fecthData = () => {
          axios
            .get("http://localhost:5000/user/me", {
              headers: {
                Authorization: "bearer" + " " + local,
              },
            })
            .then((res) => {
            //   console.log("rspon", res.data)
              setUserData({
                Image_link: res.data.Image_link,
                email: res.data.email,
                employee_id: res.data.employee_id,
                lastname: res.data.lastname,
                name: res.data.name,
                password: res.data.password,
                position: res.data.position,
                tell: res.data.tell,
              })
            })
          .catch((err)=>{
            throw err  
          })
      }
   
    const [AuthState, setAuthState] = useState({
        accessToken:null,
        authenticated:null,
        role:null
    });

    const [userData, setUserData] = useState({
        Image_link: "",
        email: "",
        employee_id: "",
        lastname: "",
        name: "",
        password: "",
        position: "",
        tell: "",
    })

    // console.log("employee",userData) 
    const Logout = () =>{
        localStorage.clear();

        setAuthState({
            accessToken:null,
            authenticated:false,
            role:null
        })
    } 

    const getUserData = () => {
        return userData
    }

    const getAccessToken = () =>{
        console.log("hello", AuthState.accessToken)
        return AuthState.accessToken;
    }

    return(
        <Provider value={
            {
                AuthState,
                setAuthState,
                Logout,
                getAccessToken,
                setUserData,
                getUserData,   
            }
        }>
            {children}
        </Provider>
    )

}


export {AuthProvider , AuthContext}