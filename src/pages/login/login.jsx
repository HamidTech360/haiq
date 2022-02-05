import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link,  useHistory } from 'react-router-dom';
import axios from 'axios'
import {apiUrl} from '../../config.json'

import { CircularProgress } from '@material-ui/core';
import Footer from '../../components/footer/footer';

//store
import {login} from '../../store/user'

import './css/login.css'


const Login = ()=>{
    const history = useHistory()
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    
    const [showProgress, setShowProgress] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(null)
    const [data, setData] = useState({
        email:'',
        password:''
    })
  
    const handleChange=(e)=>{
        const clone = {...data}
        clone[e.currentTarget.name] = e.currentTarget.value
        setData(clone)
    //    console.log(data);
    }
    const handleSubmit=async (e)=>{
        setShowProgress(true)
       
        try{
            
            let response = await axios.post(`${apiUrl}/user/auth`,data)
            
            console.log(response.data);
            if(response.data.status==="success"){
                // localStorage.clear()
                // localStorage.setItem('auth_token', response.data.token)
                // history.push('/user')
                dispatch(login(response.data))
                console.log(user);
                history.push('/user')
            }
            

           
        }catch(error){
            setShowErrorMsg(error.response?.data)
            setShowProgress(false)

        }

    }
    
        // const {email, password} = this.state.data
        return(
            <>
                       <div className="signUp_wrapper container" id="login_wrapper">
            
            <div className="signup-form-box">
                <div className="bold-text signup_heading text-center">
                    Sign In
                </div>
                 
                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Email</label>
                        <input type="email"
                                name="email"                                   
                                className="form-control" 
                                aria-describedby="emailHelp"
                                // value={this.state.data.fname}
                                onChange={(e)=>handleChange(e)}
                        />
                        <div id="emailHelp" className="form-text">Enter your Email</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control"  
                            aria-describedby="emailHelp"
                            // value={this.state.data.lname}
                            onChange={(e)=>handleChange(e)}
                        />
                        <div id="emailHelp" className="form-text">Enter your Password</div>
                    </div>

                    
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>

                    {showErrorMsg?<div className="alert alert-danger">{showErrorMsg}</div>:''}

                    <button type="submit" className="btn btn-submit" onClick={()=>handleSubmit()}>
                        {showProgress?<CircularProgress size={25} />:'Sign In'}
                    </button>

                    <div className="query-form">Don't have an account? <Link to="/signup">sign up</Link></div>
                    <div className="back-to-home"> <Link to="/">Back to home</Link> </div>
              
            </div>
            
            </div >
            <Footer/>
            </>
        )
   

    
}

export default Login;