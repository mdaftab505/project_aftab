import Feed from "@components/Feed"


const Home = () =>{

    return(
         <section>
            <div className="text-center py-10">
                <h1 className="text-5xl font-extrabold  ">Discover & Share <br /> <span className="orange_gradient">AI-Powered Prompts</span> </h1>
            </div>
            <Feed />
         </section>
    )
}

export default Home