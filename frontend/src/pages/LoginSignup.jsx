import { useState } from "react";
import { Button, InputField } from "../components";

const LoginSignUp = () => {
    const [state, setState] = useState('Sign Up');
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const signup = () => {
        console.log('Login function executed', formData);
    }

    const login = () => {
        console.log('signUp function executed', formData);
    }

    return (
        <div className="w-full h-[92vh] bg-blue-100 flex justify-center items-center">
            <div className=" w-3/4 sm:w-96 border-2 p-4 rounded bg-zinc-50">
                <h1 className="mx-3.5 font-semibold">{state}</h1>
                <div className="flex, flex-col gap-5 mt-7">
                    {state == 'Sign Up' ? <InputField name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="your name" /> : <></>}
                    <InputField name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="email" />
                    <InputField name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="password" />
                </div>
                <Button text="Continue" onClick={state == 'Login' ? login : signup} />
                {state == 'Sign Up'
                    ? <p className="mt-5 text-slate-600 font-medium">Already have an account?<span className='font-semibold text-red-500' onClick={() => { setState('Login') }}> Login here</span></p>
                    : <p className="mt-5 text-slate-600 font-medium">Create an account?<span className='font-semibold text-red-500' onClick={() => { setState('Sign Up') }}> Click here</span></p>
                }
                <label htmlFor="loginsignup-agree" className="align-middle text-sm font-medium text-slate-600"><input className="mr-3" id="loginsignup-agree"type="checkbox" name="" />
                    By continuing, i agree to the terms of use & privacy policy.
                </label>
            </div>
        </div>
    )
}

export default LoginSignUp;