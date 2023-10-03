import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function ReadPage() {


    const nav = useNavigate();
    const [data, setData] = useState([]);

    async function fetch() {
        const url = await axios.get(`https://json-server-phi-nine.vercel.app/api/posts`);
        setData(url.data);
    }
    useEffect(() => {
        fetch();
    }, []);


    async function handleDelete(id) {
        const res = await axios.delete(`https://json-server-phi-nine.vercel.app/api/posts/${id}`);
        if (res.status === 200) {
            alert("Data Deleted successfully");
            fetch();
        }
    }

    function editPost(id) {
        nav(
            `/update/${id}`
        )
    }


    return (
        <div className=' sm:px-8 md:px-16 lg:px-16 xl:px-52 py-14'>
            {/* {JSON.stringify(data)} */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sl.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr key={item.id} className="bg-white border-b  ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {index+1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/edit/${item.id}`} className="font-medium text-blue-600  hover:underline">Edit</Link>{' '}|{' '}<button onClick={
                                                ()=>handleDelete(item.id)
                                            } className
                                            ="font-medium text-red-600 hover:underline" >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })

                        }


                    </tbody>
                </table>
            </div>



        </div>
    )
}
