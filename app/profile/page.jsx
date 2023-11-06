'use client'
import Profile from "@components/Profile"
import { useEffect,useState } from "react"
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";







const MyProfile = () => {
 
    const [post, setPost] = useState([]);
    const {data:session} = useSession();
    const router = useRouter();
    const searchParam = useSearchParams();
    const promptId = searchParam.get('id');
   
    
    useEffect(()=>{

        const fetchData = async ()=>{

            
  console.log(session);
 
            if(promptId === null){
    
          const response = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await response.json();
          console.log(data);
          
          setPost(data);
            }
            else{
              const response = await fetch(`/api/users/${promptId}/posts`);
              const data = await response.json();
              
              setPost(data);
            }
          
    
          
          
    
        }
       
        if(promptId || session?.user.id) fetchData();
    
      },[])

    const handleEdit =(post)=>{
      
      router.push(`/update-prompt?id=${post._id}`)

         
     
    }

    const handleDelete = async (post) =>{

      const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
      if(hasConfirmed){
        try {
           await fetch(`/api/prompt/${post._id.toString()}`,
           {
            method:'DELETE',
           });
           
          
           window.location.reload();
           
        } catch (error) {
           console.log(error);
        }
      }

    }

    

    
console.log(session)
  return (
         <Profile
         name={promptId ? post[0]?.creator.username: session?.user.name}
         desc= 'Welcom to your personalized profile page'
         data={post}
         handleEdit={handleEdit}
         handleDelete={handleDelete}
         />
  )
}

export default MyProfile