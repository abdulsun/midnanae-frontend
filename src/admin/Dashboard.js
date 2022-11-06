import { useEffect, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { AuthContext } from "./../Context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true)

  // const loadToken = () => {
  //   console.log(authContext.AuthState.accessToken)
  //   setToken(authContext.getAccessToken());
  //   console.log("555", token)
  // };

  // const local = localStorage.getItem('token')
  // console.log("local", local)
  // useEffect(() => {
  //   loadToken();
  //   if(local !== null){
  //     fecthData();
  //   }
  //   fecthData(local);
  // }, []);

  //   const fecthData = () => {
  //       axios
  //         .get("http://localhost:5000/user/me", {
  //           headers: {
  //             Authorization: "bearer" + " " + local,
  //           },
  //         })
  //         .then((res) => {
  //           console.log("rspon", res.data)
  //           authContext.setUserData({
  //             Image_link: res.data.Image_link,
  //             email: res.data.email,
  //             employee_id: res.data.employee_id,
  //             lastname: res.data.lastname,
  //             name: res.data.name,
  //             password: res.data.password,
  //             position: res.data.position,
  //             tell: res.data.tell,
  //           })
  //         })
  //       .catch((err)=>{
  //         setLoading(false);
  //         throw err  
  //       })
  //   }
 
    console.log("facj", authContext.getUserData())

    return (
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
          <h1>Hello DashBorad</h1>  
        </Container>
      </Box>
    );
}
