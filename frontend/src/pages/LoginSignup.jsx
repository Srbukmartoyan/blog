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
    }

    const validate = (value) => { 
        if (validator.isStrongPassword(value, { 
            minLength: 8, minLowercase: 1, 
            minUppercase: 1, minNumbers: 1, minSymbols: 1 
        })) { 
            setErrorMessage('');
        } else { 
            setErrorMessage('Is Not Strong Password: Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one symbol.') 
        } 
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
                localStorage.setItem('authUser', JSON.stringify(data.user));
                window.location.replace('/user');
            } else {
                'errors' in data ? alert(data.errors[0].message) : alert(data.error)
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Failed to authenticate');
        }
    };
    
    const signup = async () => {
        console.log('Signup function executed', formData);
        if (!formData.email || !formData.password || !formData.username) {
            alert('Please fill in all fields');
            return;
        }
        validate(formData.password);
        if (errorMessage) {
            alert('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one symbol.');
            return;
        }
        await handleAuth('/signup', formData);
    };
    
    const login = async () => {
        if (!formData.email || !formData.password) {
            alert('Please fill in all fields');
            return;
        }
        console.log('Login function executed', formData);
        await handleAuth('/signin', formData);
    };
    
    const clearFormData =() => {
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
                    {state === 'Sign Up' ? <InputField name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="your name"/> : <></>}
                    <InputField name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="email"/>
                    <InputField name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="password"/>
                    {state === 'Sign Up' ? <span style={{ fontWeight: 'bold', color: 'red', fontSize: '12px', lineHeight: '1'}}>{errorMessage}</span> : <></>}
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