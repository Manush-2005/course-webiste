import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
function Signin() {
  return (

    <>
<center>
    <div style={{
        marginTop:"100px",
        marginBottom:"10px",
    }}>
        Welcome to Admin signin page


    </div>
    </center>
    <center>
<div style = {{
    border:"2px solid black",
    width:"400px",
    marginTop:"100px",
    padding:"20px",

}}>
    <TextField fullWidth id="username" label="email" variant="standard" />
    <br/><br/>
<TextField  fullWidth id="password" label="password" variant="standard" type={"password"} />
    <br/><br/>
    <Button variant="contained" onClick={()=>{

        function callback (response){

            let data = response.data;

            if(data.status = 200){

                alert("logged in")

                window.location = "/admin/Homepage"
            }
           



            

            
          
        }

        axios.post("http://localhost:3000/admin/signin",{
            username:document.getElementById("username").value,
            password:document.getElementById("password").value,

            

        }).then(callback)
    }}>Signin</Button>
    
    
</div>
</center>

    
    </>
    
      
    
  );
}

export default Signin;
