import React,{useEffect, useState} from 'react'
import Forms from './Forms'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Create() {
const [edit, setEdit] = useState({})
    const { id } = useParams()
    async function fetchEdit (){
        const response = await axios.get(`https://json-server-phi-nine.vercel.app/api/posts/${id}`)
        // const data = await response.json()
        setEdit(response.data)
    }

    useEffect(() =>{
        fetchEdit()
    },[id])

  return (
    <div>
        <Forms edit={edit} id={id}/>
    </div>
  )
}
