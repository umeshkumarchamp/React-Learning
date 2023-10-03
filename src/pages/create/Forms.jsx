import React from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Forms() {
    const nav = useNavigate(); 
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            comment: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required').min(2).max(50).label(),
            email: yup.string().required('Email is required'),
            phone: yup.string().required('Phone is required').min(10).max(10).label(),
            comment: yup.string().required('Comment is required').min(5).max(100).label(),
        }),
        onSubmit: async (values) => {

            try {
                const res = await axios.post('https://json-server-phi-nine.vercel.app/api/posts', values);
                console.log(res);
                alert('Post Done Successfully')
                nav('/read')
            } catch (error) {
                alert(error)
            }
        }
    })

    // const {handleSubmit} = formik

    return (
        <div>
            <section className="mt-20">
                <div className="flex flex-col items-center justify-center px-6 lg:px-96 mt-8  py-8 mx-auto lg:py-0">


                    <div className="w-full bg-white rounded-lg shadow   ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center ">
                                Post Comment
                            </h1>
                            <div className="space-y-4 md:space-y-6 ">

                                <FormikProvider value={formik}>

                                    <Form onSubmit={formik.handleSubmit}>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                                            <div className='py-3'>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name </label>
                                                <input type="text" {...formik.getFieldProps('name')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="umeshkumar" />
                                                {/* <h1 className='text-red-600'>Email is required</h1> */}
                                                <h1 className='text-red-500 text-sm'>{formik.touched.name && formik.errors.name}</h1>

                                            </div>
                                           
                                            
                                            
                                            <div className='py-3'>

                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
                                                <input type="number"
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value, 10))
                                                          .toString()
                                                          .slice(0, 10);
                                                      }}
                                                {...formik.getFieldProps('phone')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone number" />
                                                {/* <h1 className='text-red-600'>Email is required</h1> */}

                                                <h1 className='text-red-500 text-sm'>{formik.touched.phone && formik.errors.phone}</h1>
                                            </div>

                                            <div className='py-3 col-span-2'>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email-Id</label>
                                                <input type="text" {...formik.getFieldProps('email')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                                {/* <h1 className='text-red-600'>Email is required</h1> */}
                                                <h1 className='text-red-500 text-sm'>{formik.touched.email && formik.errors.email}</h1>
                                            </div>
                                            <div className='py-3 col-span-2'>

                                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Comment</label>
                                                <textarea type="text" {...formik.getFieldProps('comment')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  -gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Noida" />
                                                {/* <h1 className='text-red-600'>Email is required</h1> */}
                                                <h1 className='text-red-500 text-sm'>{formik.touched.comment && formik.errors.comment}</h1>
                                            </div>
                                            
                                            
                                            

                                        </div>
                                        <button type="submit"  className="w-full mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create a Post</button>

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
