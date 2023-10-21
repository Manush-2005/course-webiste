import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
function Signup() {
  return (

    <>
<center>
    <div style={{
        marginTop:"100px",
        marginBottom:"10px",
    }}>
        Welcome to Admin signup page


    </div>
    </center>
    <center>
<div style = {{
    border:"2px solid black",
    width:"400px",
    marginTop:"100px",
    padding:"20px",

}}>
    <TextField    fullWidth id="username" label="username" variant="standard" />
    <br/><br/>
<TextField  fullWidth id="password" label="password" variant="standard" type={"password"} />
    <br/><br/>
    <Button variant="contained" onClick={async()=>{

        function callback (response){
           let data = response.data;
           localStorage.setItem("token",data.token);
           window.location = "/admin/signin"
        }
        axios.post("http://localhost:3000/admin/signup",{
            username:document.getElementById("username").value,
            password:document.getElementById("password").value,
        }).then(callback)

        


    }

    }>Signup</Button>

    
</div>
</center>

    
    </>
    
      
    
  );
}

export default Signup;