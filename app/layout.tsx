
import Nav from '@components/Nav';
import '@styles/global.css';

import Provider from '@components/Provider';



export const metadata = {
    title: 'promtopia',
    description: 'Discover & Share AI Propmts'
}



const RootLayout =({children}:any)=>{

    return(
       <html lang='en'>
           <body>
            <Provider>
               <div>
                <div className='gradient' />
               </div>
            <main className='app'>
              <Nav />
                {children}
            </main>
            </Provider>
           </body>

       </html>
    )
}

export default RootLayout