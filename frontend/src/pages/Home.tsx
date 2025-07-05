import NavigationBar from "../components/NavigationBar"

const Home = () => {
    return (
        <div className="h-[500px] w-full">
            <NavigationBar position="static"/>
            <div className="h-[400px] w-full flex justify-center items-center relative top-20 z-10">
                <img src="/images/bg.svg" alt="" className="h-120 opacity-30 mb-7 absolute" />
                <div className="flex flex-col items-center absolute text-2xl text-black">
                    <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-8xl text-center mb-8">BEEPItt</h1>
                    <p className="font-titlemain w-l text-secondary">Sends emails and makes calls instantly when backend</p>
                    <p className="font-titlemain w-l text-secondary">errors occur, ensuring quick response and minimal</p>
                    <p className="font-titlemain w-l text-secondary">downtime.</p>
                    <button className="h-10 w-52 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-sm main-btn mt-8">START MONITORING</button>
                </div>
            </div>
            <DownComponnt />
        </div>
    )
}

const DownComponnt = () => {
    return (
        <div className="h-[700px] w-full flex items-center justify-center relative top-30">
            <div className="h-full w-[1200px] border-1 border-[rgba(255,255,255,1)] border-opacity-10 rounded-2xl shadow-[0px_0px_20px_5px_rgba(215,215,215,1)]">

            </div>
        </div>
    )
}




export default Home


// https://www.youtube.com/shorts/XAgONYMGQ8w