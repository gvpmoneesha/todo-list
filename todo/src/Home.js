import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos,setTodos] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit = (id,done) =>{
        axios.put('http://localhost:3001/update/'+id,{done:!done})
        .then(result => {
            setTodos(()=>{
                const data = todos.map(todo=>{
                    if(todo._id === id){
                        return{...todo,
                        done:!done
                    }
                    }
                    return todo
                })
                return data
            })
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            setTodos(()=>{
                const newTodoList = todos.filter(todo=>{
                    if(todo._id !== id){
                        return todo
                    }
                })
                return newTodoList
            })
        })
        .catch(err => console.log(err))
    }
    console.log(todos);

const handleAdd = (obj)=>{
    setTodos([...todos, obj])
}

  return (
    <div className='home'>
        <h2 className='txt'>Todo List</h2>

        <Create addtodo= {handleAdd}/>

        {
            todos.length === 0? <div><h2>No Records</h2></div>:
            todos.map( (todo,index) => (
                <div key={index} className='task'>
                    <div className='checkbox' onClick={()=>handleEdit(todo._id,todo.done)}>
                        {todo.done ?<BsFillCheckCircleFill className='icon'/>:
                        <BsCircleFill className='icon' />
                        }
                        <p className={todo.done ? "line_through":""}>{todo.task}</p>
                    </div>

                    <div>
                        <span><BsFillTrashFill className='icon' onClick={()=>{handleDelete(todo._id)}}/></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home