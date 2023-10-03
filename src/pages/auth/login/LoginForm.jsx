import React from 'react'
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required')
        }),
        onSubmit: async (values) => {

            try {
                const res = await axios.get(`https://json-server-phi-nine.vercel.app/api/users?email=${values.email}&password=${values.password}`);
                console.log(res);
                if (res.data.length > 0) {
                    alert('Login successfully');
                    nav(`/create`);
                } else {
                    alert('Invalid Credentials');
                }
            } catch (error) {
                alert(error)
                console.log(error)

            }
        }
    })

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                            Sign in to your account
                        </h1>
                        <div className="space-y-4 md:space-y-6" action="#">
                            <FormikProvider value={formik}>

                                <Form onSubmit={formik.handleSubmit}>
                                    <div className='py-3'>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Your email</label>
                                        <input type="text" {...formik.getFieldProps('email')} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="umesh@gmail.com" />
                                        {formik.errors.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

                                    </div>
                                    <div className='py-3'>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Password</label>
                                        <input type="password" {...formik.getFieldProps('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" />
                                        {formik.errors.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
                                    </div>
                                    
                                    <div className='py-3'>
                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800">Sign in</button>
                                    <p className="text-sm py-5 font-light text-gray-500 :text-gray-400">
                                        Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline :text-primary-500">Sign up</Link>
                                    </p>
                                    </div>
                                </Form>
                            </FormikProvider>

                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
