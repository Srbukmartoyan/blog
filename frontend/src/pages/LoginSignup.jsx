import { useState } from "react";
import validator from 'validator'
import { Button, InputField } from "../components";

const LoginSignUp = () => {
    const [state, setState] = useState('Login');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            validate(e.target.value);
        }
    };

    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setErrorMessage('');
            return true;
        } else {
            setErrorMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one symbol.');
            return false;
        }
    };

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
                localStorage.setItem('authUser', JSON.stringify(data.user));
                window.location.replace('/user');
            } else {
                'errors' in data ? setErrorMessage(data.errors[0].message) : setErrorMessage(data.error);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage('Failed to authenticate');
        }
    };

    const signup = async () => {
        console.log('Signup function executed', formData);
        if (!formData.email || !formData.password || !formData.username) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (validate(formData.password)){
            await handleAuth('/signup', formData);
        } 
    };

    const login = async () => {
        console.log('Login function executed', formData);
        if (!formData.email || !formData.password) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (validate(formData.password)){
            await handleAuth('/signin', formData);
        } 
    };

    const clearFormData = () => {
        setFormData({
            email: "",
            password: "",
            username: ""
        });
        setErrorMessage('');
    }

    const handleStateChange = (newState) => {
        clearFormData();
        setState(newState);
    }

    return (
        <div className="w-full h-[92vh] bg-slate-200 flex justify-center items-center">
            <div className=" w-3/4 sm:w-96 border-2 border-slate-300 p-4 rounded bg-zinc-50">
                <h1 className="mx-3.5 font-semibold">{state}</h1>
                <div className="flex, flex-col gap-5 mt-7">
                    {state === 'Sign Up' ? <InputField name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="your name" /> : <></>}
                    <InputField name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="email" />
                    <InputField name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="password" />
                    {errorMessage && (
                        <span className="text-xs text-red-500 text-center bg-red-100 border border-red-400 rounded p-2 my-2 block">{errorMessage}</span>
                    )}
                </div>
                <Button text="Continue" onClick={state === 'Login' ? login : signup} />
                {state === 'Sign Up'
                    ? <p className="mt-5 text-slate-600 font-medium">Already have an account?<span className='font-semibold text-red-500 cursor-pointer' onClick={() => { handleStateChange('Login') }}> Login here</span></p>
                    : <p className="mt-5 text-slate-600 font-medium">Create an account?<span className='font-semibold text-red-500 cursor-pointer' onClick={() => { handleStateChange('Sign Up') }}> Click here</span></p>
                }
            </div>
        </div>
    )
}

export default LoginSignUp;