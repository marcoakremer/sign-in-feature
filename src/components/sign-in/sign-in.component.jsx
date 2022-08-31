import { useState } from "react"
import { createNewUser, createUserData } from "../../utils/firebase"

import './sign-in.style.css'

const SignIn = () => {

    const initialState = { 
        email: '',
        password: ''
    }
    
    const [ state, setValue ] = useState(initialState)
    const { email, password } = state
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        
        setValue({...state, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await createNewUser(email, password)
        const { user } = res
        return await createUserData(user)
    }


    return (
        <div className="sign-in-container">
            <h1>Sign in with email and password</h1> 
                <form className="form-container" onSubmit={handleSubmit}>
                    
                        <label>EMAIL</label>
                        <input name="email" onChange={onChangeHandler} value={email} />
                    
                   
                        <label>PASSWORD</label>
                        <input  name="password" onChange={onChangeHandler} value={password}/>
                   
                    <div ><button className="btn" type="submit">Sign In</button></div>
                    
                </form>
        </div>
    )
}

export default SignIn