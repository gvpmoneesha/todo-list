import React, { useState } from 'react'
import axios from 'axios'

function Create({addtodo}) {
    const [task,setTask] = useState("")
  

    const handleAdd = () =>{
        axios.post('http://localhost:3001/add',{task:task})
        .then( result => {
          addtodo(result.data);
        //  window.location.href = window.location.href;

          setTask("")
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='createForm'> 
        <input type='text' value={task} placeholder='Enter task' onChange={(e)=>{setTask(e.target.value)
            
        }} />
        <button type='submit' onClick={()=>{handleAdd()}}>Add</button>
    </div>
  )
}

export default Create

