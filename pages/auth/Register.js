import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import styles from './register.module.css';
import Errors from '../components/errors/Errors';


const Register = () =>{


    const [signUpForm,setsignUpForm] = useState({});
    const [handleErrors,setHandleErrors] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);

    const getCSRFToken = async() => {
        await axios.get('http://localhost:5000/api/auth/getCSRFToken',{withCredentials:true})
        .then(res => axios.defaults.headers.post['X-CSRF-Token'] = res.data)
        console.log(axios.head['X-CSRF-Token']);
    }

    const handleSignUpFormChange = (e) => {
        setsignUpForm({
          ...signUpForm,
          [e.target.name]:e.target.value
        });
    };

    const register = async(e) => {
        e.preventDefault();

        try{
            const res = await axios.post("http://localhost:5000/api/auth/signup/",
                {
                    username: signUpForm.username,
                    email: signUpForm.email,
                    password: signUpForm.password,
                    repassword: signUpForm.repassword
                },
                {
                    withCredentials: true,
                }
            );

            if(res.status === 200){
                // navigate('/registered/');
            }
        }catch(error){
            let parsedErrors = [];
            parsedErrors = JSON.parse(error.request.response);
            console.log(error.request.response);
            console.log(parsedErrors);
            setHandleErrors(parsedErrors);
        }finally{
            setIsSubmitted(true);
        }
    }

    useEffect(() => {
        getCSRFToken();
    },[])

    return(
        <>
            <section>
                <Head>
                    <title>Register</title>
                </Head>
                <div className={styles.register_module}>
                    <ul className={styles.select_form_list}>
                        <li className={`${styles.select_form_label} ${styles.select_form_label_active}`}>
                            <Link href="/auth/Register">
                                <a>
                                    Sign up
                                </a>
                            </Link>
                        </li>
                        <li className={styles.select_form_label}>
                            <Link href="/auth/Login">
                                <a>
                                    Sign in
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <form onSubmit={register} className={styles.border_register_form}>
                        <h1 className={styles.register_header}>Register</h1>
                        {isSubmitted && handleErrors && <Errors error={handleErrors} isSubmitted={isSubmitted} />}
                        <div className={styles.register_form}>
                            <input type="email" className={styles.input_register_email} name="email" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="email" className={styles.label_register_email}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_register}/>
                                <span className={styles.label_register_content}>Email</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className={styles.register_form}>
                            <input type="text" className={styles.input_register_username} name="username" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="username" className={styles.label_register_username}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_register}/>
                                <span className={styles.label_register_content}>Username</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className={styles.register_form}>
                            <input type="password" className={styles.input_register_password} name="password" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="password" className={styles.label_register_password}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_register}/>
                                <span className={styles.label_register_content}>Password</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className={styles.register_form}>
                            <input type="password" className={styles.input_register_repassword} name="repassword" placeholder="" onChange={handleSignUpFormChange} autoComplete='off'/>
                            <label htmlFor="repassword" className={styles.label_register_repassword}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_register}/>
                                <span className={styles.label_register_content}>Repeat your Password</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className={styles.btn_submit_register}>SignUp!</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Register;