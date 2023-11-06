'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';






const Feed = () => {
 



  const [search, setSearch] = useState([]);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const {data: session} = useSession();
  
  useEffect(()=>{

    const fetchData = async ()=>{

      const response = await fetch('/api/prompt')

      const data = await response.json();

      setPost(data);
      setPosts(data);
      

    }
    fetchData();

  },[])
const handleChange =  (e) => {
    e.persist();
  
      setSearch(e.target.value)

    
  
  };


  useEffect(()=>{

      const newPost = posts.filter(pos=> pos.tag.includes(search) || pos.prompt.includes(search)  );                
      setPost(newPost);
     
      
     

  },[search]);

  const PromptCardList = ({data, handleTagClick})=>{

    return(
        <div className='mt-16 prompt_layout'>
       {
         data.map((post)=>(
          <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          />
         ))
       }
        </div>
    )

  }
   


  return (

    <div>

           <div className=' bg-slate-100 my-10 rounded-sm'>
                <input value={search} onChange={handleChange} placeholder="Search keyword or tag" className='flex-1 font-satoshi bg-transparent py-2 px-3 outline-none'/>
            </div>
   

   
     <div className=''>
{
     session?.user && 
       <PromptCardList 
        data={search === ''?posts:post}
        handleTagClick={(post)=> setSearch(post.tag)}
        />
}      
       
     </div>
    
     </div>

  )
}

export default Feed