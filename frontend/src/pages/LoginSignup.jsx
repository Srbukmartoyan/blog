import { useState } from "react";
import { Button, InputField } from "../components";

const LoginSignUp = () => {
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleAuth = async (url, formData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('auth-token', data.token);
                window.location.replace('/');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Failed to authenticate');
        }
    };
    
    const signup = async () => {
        console.log('Signup function executed', formData);
        await handleAuth('/signup', formData);
    };
    
    const login = async () => {
        console.log('Login function executed', formData);
        await handleAuth('/signin', formData);
    };
    

    return (
        <div className="w-full h-[92vh] bg-slate-200 flex justify-center items-center">
            <div className=" w-3/4 sm:w-96 border-2 border-slate-300 p-4 rounded bg-zinc-50">
                <h1 className="mx-3.5 font-semibold">{state}</h1>
                <div className="flex, flex-col gap-5 mt-7">
                    {state === 'Sign Up' ? <InputField name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="your name" /> : <></>}
                    <InputField name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="email" />
                    <InputField name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="password" />
                </div>
                <Button text="Continue" onClick={state === 'Login' ? login : signup} />
                {state === 'Sign Up'
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