import React from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterForm() {

    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            term : false,
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
            confirm_password: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Password must match'),
            term: yup.boolean().oneOf([true], 'You must agree to the terms'),
        }),
        onSubmit: async (values) => {

            try {
                const res = await axios.post('https://json-server-phi-nine.vercel.app/api/users', values);
                console.log(res);
                if (res.status == 201) {
                    alert('Registered successfully');
                    nav(`/`);
                } else {
                    alert('Something went wrong');
                }
            } catch (error) {
                alert(error)
                console.log(error)

            }
        }
    })

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 -gray-800 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
                                Create and Account
                            </h1>
                            <div className="space-y-4 md:space-y-6 ">

                                <FormikProvider value={formik}>

                                    <Form onSubmit={formik.handleSubmit}>

                                        <div className='py-3'>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name </label>
                                            <input type="text" {...formik.getFieldProps('name')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="umeshkumar" />
                                            {/* <h1 className='text-red-600'>Email is required</h1> */}
                                            {formik.errors.name && formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}

                                        </div>
                                        <div className='py-3'>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email-Id</label>
                                            <input type="text" {...formik.getFieldProps('email')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                            {/* <h1 className='text-red-600'>Email is required</h1> */}
                                            {formik.errors.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}

                                        </div>
                                        <div className='py-3'>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                            <input type="password" {...formik.getFieldProps('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            {formik.errors.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}

                                        </div>
                                        <div className='py-3'>
                                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                                            <input type="confirm-password" {...formik.getFieldProps('confirm_password')} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            {formik.errors.confirm_password && formik.errors.confirm_password && <div style={{ color: 'red' }}>{formik.errors.confirm_password}</div>}

                                        </div>
                                        <div className="flex items-start py-3" >
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" {...formik.getFieldProps('term')} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  -gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                                

                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div>
                                        {formik.errors.term && formik.errors.term && <div style={{ color: 'red' }}>{formik.errors.term}</div>}

                                        <button type="submit" className="w-full mt-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>

                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 py-3">
                                            Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                        </p>
                                    </Form>
                                </FormikProvider>
                            </div>

                        </div>
                    </div>



                </div>
            </section>


        </div>
    )
}
