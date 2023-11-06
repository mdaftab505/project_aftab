import Image from 'next/image'
import React, { useState } from 'react'
import Feed from '@components/Feed'

import {usePathname, useRouter} from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import User from '@models/user'





const PromptCard = ({post,handleTagClick, handleEdit, handleDelete }) => {

  const [copy, setCopy] =useState(false);
  const {data:session}=useSession();
  const router =useRouter();
  const pathname = usePathname();
 
  const handleCopy =()=>{
    setCopy(true);

  setTimeout(() => {
    setCopy(false);
 }, 1000);


}

  return( 
    <div className=' prompt_card w-content-fit'>

      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={()=>{
    
          router.push(`/profile?id=${post.creator._id}`)}}>
          <Image
          src={post.creator.image}
          alt='user_image'
          width={40}
          height={40}
          className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-santosi font-semibold text-gray-900'>{post.creator.username}</h3>
            <p className='font-inter text-sm text-gray-300'>{post.creator.email}</p>
          </div>
        </div>
        
        <div className='relative rounded-full hover:bg-gray-300 p-2  transition ease-in-out delay-150 'onClick={()=>{
      navigator.clipboard.writeText(post.prompt)
      .then(
      success => {
        handleCopy();
      },
      failed => {console.log('nocopy')},      
      ) 

        }} >
        <Image src={copy ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'} width={15} height={15} alt='copy'  />

       { copy && <span className='absolute text-[10px] top-[-15px] right-[3px] text-orange-400 font-satoshi'>Copied!</span> }
        </div>
      

      </div>


     <p className='my-4 font-santoshi text-sm text-gray-700'>{post.prompt}</p>
     <p className='font-inter text-sm blue_gradient cursor-pointer'
       onClick={()=>handleTagClick && handleTagClick(post)}>
      #{post.tag}
     </p>

     { 
      session?.user.id === post.creator._id  && pathname === '/profile' &&
      <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
        <p className='font-inter text-sm green_gradient cursor-pointer'
         onClick={handleEdit}>
          Edit
        </p>
        <p className='font-inter text-sm orange_gradient cursor-pointer'
         onClick={handleDelete}>
          Delete
        </p>

       </div>
      }      
    </div>  

  )
}

export default PromptCard