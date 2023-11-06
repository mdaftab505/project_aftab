"use client"

import User from '@models/user';
import { signOut , signIn, useSession,getProviders } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Nav = () => {
  const {data: session} = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);

  const [providers , setProviders] =useState(null);
  const router = useRouter();

useEffect(()=>{
const setUserProviders = async ()=>{
     const response = await getProviders();

     setProviders(response);
}
 setUserProviders();

  }, []);



  return (
      <nav className='flex max-container padding-container items-center justify-between p-5 w-full'>
           <div>

               <Link href='/' className='flex items-center gap-2'>
                <Image src='assets/images/logo.svg' 
                alt='logo' height={45} width={45}
                className='' />
                <label htmlFor="logo"
                className='text-2xl font-bold max-md:hidden'>Promptopia</label>

               </Link>

           </div>
           {
              session?.user ?(
                <div className='flex max-sm:hidden gap-4'>
                    <Link href='create-prompt' className='black_btn'>
                        Create Post
                    </Link>
                    <button
                     type='button'
                     onClick={()=>{
                      signOut({redirect:false}).then(()=>{
                        router.push('/');
                     })

                     }}
                    className='outline_btn'
                    >
                      Sign Out
                    </button>
                      <Link href='/profile'>
                      <Image 
                      src={session?.user.image}
                      width={37}
                      height={37}
                      className='rounded-full broder-2  border-black'
                      alt='logo'
                      />
                  </Link>
                      
                      
                </div>)
              : (<>
              
              {
                providers && Object.values(providers).map((provider)=>
                (
                  <button
                  type='button'
                  key={provider.name}
                  onClick={()=>{signIn(provider.id)}}
                 className='outline_btn max-sm:hidden'
                 >
                   Sign Up
                 </button>
                ))

              }
                    

              </>
              )
           }

           {/* mobile views */}
          
           <div className='sm:hidden'>
            {
              session?.user ?
             (
              <div className='relative '>         
              <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='logo'
              onClick={()=> setToggleMenu(!toggleMenu)}
              />
              {toggleMenu && <div className='dropdown'>
              <Link href='/profile' className='dropdown_link' onClick={()=>{
                setToggleMenu(false)
              }}  >
               {session?.user.name}
              </Link>
              <Link href='/' className='dropdown_link' onClick={()=>setToggleMenu(false)}>
               Dasboard
              </Link>
              <Link href='create-prompt' className='dropdown_link'>
                        Create Post
              </Link>
              <button type='button' className='black_btn w-full mt-3' onClick={()=>{
                setToggleMenu(false);
                
                 signOut({redirect:false}).then(()=>{
                  router.push('/');
                 })
                
                }}>
                  Sign Out
              </button>
             </div>}
             </div>

  
              )
            
             : ( <>
              {
                providers && Object.values(providers).map((provider)=>
                (
                  <button
                  type='button'
                  key={provider.name}
                  onClick={()=>{signIn(provider.id)}}
                 className='outline_btn'
                 >
                   Sign Up
                 </button>
                ))

              }
             </>)

            }
            
          

           </div>
           
          
          
           
      </nav>
  )
}

export default Nav;