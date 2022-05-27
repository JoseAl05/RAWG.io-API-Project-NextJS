import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';
import Errors from '../components/errors/Errors';
import styles from './login.module.css';

const Login = () =>{

    // let navigate = useNavigate();
    const router = useRouter();
    const {setAuth} = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [handleErrors,setHandleErrors] = useState();
    const [isSubmitted,setIsSubmitted] = useState(false);


    const handleEmailChange = (e) => {
        setEmail({
          ...email,
          [e.target.name]:e.target.value
        });
    };


    const handlePasswordChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]:e.target.value
        });
    };
    const getCSRFToken = async() => {
        await axios.get('http://localhost:5000/api/auth/getCSRFToken',{withCredentials:true})
        .then(res => axios.defaults.headers.post['X-CSRF-Token'] = res.data)
        return;
    }

    const login = async(e) => {

        e.preventDefault();

        try{
            const res = await axios.post(
                'http://localhost:5000/api/auth/signin/',
                {
                    email:email.email,
                    password: password.password
                },
                {
                    withCredentials:true,
                }
            );

            if(res.status === 200){
                alert('!LOGGED');
                setAuth(true);
                router.push('/dashboard/1')
            }
        } catch(error){
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
            <div>
                <Head>
                    <title>Login</title>
                </Head>
                <div className={styles.login_module}>
                    <ul className={styles.select_form_list}>
                        <li className={styles.select_form_label}>
                            <Link href="/auth/Register">
                                <a>
                                    Sign up
                                </a>
                            </Link>
                        </li>
                        <li className={`${styles.select_form_label} ${styles.select_form_label_active}`}>
                            <Link href="/auth/Login">
                                <a>
                                    Sign in
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <form onSubmit={login} className={styles.border_login_form}>
                        <h1>Login</h1>
                        {isSubmitted && handleErrors && <Errors error={handleErrors} isSubmitted={isSubmitted} />}
                        <br />
                        <div className={styles.login_form}>
                            <input type="email" className={styles.input_login_email} name="email" placeholder="" onChange={handleEmailChange} autoComplete='off' />
                            <label htmlFor="email" className={styles.label_login_email}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_login}/>
                                <span className={styles.label_login_content}>Email</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <div className={styles.login_form}>
                            <input type="password" className={styles.input_login_password} name="password" placeholder="" onChange={handlePasswordChange} />
                            <label htmlFor="password" className={styles.label_login_password}>
                                <FontAwesomeIcon icon={faArrowAltCircleRight} size='1x' className={styles.label_icon_login}/>
                                <span className={styles.label_login_content}>Password</span>
                            </label>
                            <span className={styles.focus_border}>
                                <i></i>
                            </span>
                        </div>
                        <br />
                        <br />
                        <button type="submit" className={styles.btn_submit_login}>Login!</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;