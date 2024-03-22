import  { useEffect, useState } from 'react'
import axios from 'axios';
function Create({updatedTodos ,setUpdatedTodos}) {
  const [task,setTask] = useState({});
  // const [selectedTodoId, setSelectedTodoId] = useState(null);
 

  
  useEffect(() => {
    setTask(updatedTodos.task || ''); 
  }, [updatedTodos]);
  const handleAdd = ()=>{

  if(task.trim() === ''){
      console.log("Please enter a Task!");
    } 
    else {
axios.post("http://localhost:3001/add" , { task })
.then((result)=>setUpdatedTodos(result.data))
// setUpdatedTodos(result.data)
// setTask("")
  .catch(err => console.log(err))
}
}

// console.log(updatedTodos._id,updatedTodos.task);

  return (
    <div className='flex'>
     
        <input onChange={(e)=>{
          setTask(e.target.value)
        }} value ={task} type='text' placeholder='Enter Task' className='w-64 h-11  border  rounded-l-md' >
        </input>
        <button onClick={handleAdd} className=' bg-red-400 text-white border-black w-20 h-11 rounded-r-md' name='' id=''>➕</button>
        <h1>{updatedTodos.task}</h1>
  
    </div>
  )
      }

export default Create