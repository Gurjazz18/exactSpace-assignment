import React, { useEffect, useState } from 'react';
import { FaRegThumbsUp } from "react-icons/fa";



const Photo = () => {
    const[data,setData]=useState([])
    const[page,setpage]=useState(1)
    

    const getData=()=>{

        fetch(`https://picsum.photos/v2/list?page=${page}`)
        .then((res)=>res.json())
        .then((res)=>{
            if(res){

                const AddCount=res.map((el)=>({
                    ...el,count:0
                }))
                setData((prev)=>[...prev,...AddCount])
            }
           
        })
        .catch((err)=>console.log(err))
   }

   const handleScrolling=()=>{
      if( window.innerHeight+document.documentElement.scrollTop+1
        >=document.documentElement.scrollHeight){

            setpage((prev)=>prev+1)

      }
   }

   const handleCount=(id)=>{
      
    
    setData((prev)=>{
      
    
  
    const updateCount=[...prev]
    
    return updateCount.map((el,i)=>i===id?{...el,count:el.count+1}:el)
    


   

    })
     
     
     
     
   }


    useEffect(() => {
        getData()
    }, [page]);

    useEffect(()=>{
        window.addEventListener("scroll",handleScrolling)
        return ()=> window.removeEventListener("scroll",handleScrolling)
    },[page])


  return (
    <div>
        {
            data.length>0 &&data.map((elem,i)=>(

                <div key={i} className='imageBox'>
                    <img src={elem.download_url}
                     alt={elem.author} width="30%" height="260px"/>
                     <p><span>Author</span>:{"  "}{elem.author}</p>
                     <p id='thumb' 
                     onClick={()=>handleCount(i)}><FaRegThumbsUp/></p>
                     <p >Count:{elem.count}</p>
                      
                </div>
            ))
        }
      
    </div>
  )
}

export default Photo
