import  { useEffect,useState } from 'react'
// import Create from './Create';
import axios from 'axios';
// import { FaBeer } from "react-icons/fa";


function Home() {
    const [todos,setTodos] = useState([])
    const [updatedTodos,setUpdatedTodos] = useState([])
    const [search,setSearch] = useState("");
    const [task,setTask] = useState({});

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

    const handleCheck = (id)=>{
        axios.put("http://localhost:3001/update/" + id)
        .then(result=> console.log(result),location.reload())
        .catch(err=>console.log(err))
    }
    const handleDelete = (id)=>{
        axios.delete("http://localhost:3001/delete/" + id)
        .then(result=>console.log(result), {...todos})
        .catch(err=>console.log(err))
            }
  
        useEffect(()=>{
            axios.get("http://localhost:3001/get")
            .then(result=>setTodos(result.data), {...todos})
            .catch(err=>console.log(err , "error aya h"))
        }, [todos])
        
        const handleEdit = (id)=>{
            axios.put(`http://localhost:3001/edit/${ id }`, {task: updatedTodos.task})
            .then(result=> {setUpdatedTodos(result.data), console.log(result.data, "yh result h")})
            .catch(err=>console.log(err, "request failed"))
        }

        
  return (

    <div  className='flex shadow-2xl bg-red-600 flex-col  w-[390px] ml-96 mt-8 items-center  rounded-[17px]'>

        <h1 className="text-3xl font-bold text-white  py-8">
            TO-DO LIST
        </h1>
        {/* <Create updatedTodos= {updatedTodos}  setUpdatedTodos={setUpdatedTodos}/> */}
        <div className='flex'>
     
     <input onChange={(e)=>{
       setTask(e.target.value)
     }} value ={task} type='text' placeholder='Enter Task' className='w-64 h-11  border  rounded-l-md' >
     </input>
     <button onClick={handleAdd} className=' bg-red-400 text-white border-black w-20 h-11 rounded-r-md' name='' id=''>➕</button>
     <h1>{updatedTodos.task}</h1>

 </div>
        <input className='mt-4 rounded-md h-8' placeholder='Search' onChange={(e)=>{setSearch(e.target.value)}}></input>
        {
            todos.length===0 ?

            <div><h1 className='text-2xl text-white font-bold  py-8'>No Record</h1></div>
            :
            todos.filter((item)=>{
                if(search ===""){
                    return item
                }else if(item.task.toLowerCase().includes(search.toLowerCase())){
                    return item
                }})
            .map(todo=>(
                <div key={todo._id}  className='flex  align-center w-[355px] h-12 text-white rounded-lg text-start  mt-3 bg-red-400'>
           <button className='flex-grow-[0.1] text-white' onClick={()=>handleCheck(todo._id)} >
            {
                todo.done? <p>✔</p>:
            <p>⚪</p>
            } 
            </button>
                    <p  className={todo.done? "line-through ml-2 flex-grow-[3] mt-3" : "mt-3 flex-grow-[0.80] ml-2"}>{todo.task}</p>
           <button onClick= {
            ()=>handleEdit(todo._id)
        } className="">🖊</button>
           <button onClick= {()=>handleDelete(todo._id)} className="p-2">X</button>
                </div> ))}
                <br></br>
  </div>       
  )
}

export default Home