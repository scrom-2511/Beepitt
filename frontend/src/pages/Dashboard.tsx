import NavigationBar from "../components/NavigationBar"

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <NavigationBar position="static" />
      <div className="h-[calc(100%-100px)] w-full relative">
        <div className="h-[70%] w-[80px] bg-third fixed top-1/2 transform -translate-y-1/2 rounded-2xl overflow-hidden">
          <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-1/2 transform -translate-y-1/2"></div>
        </div>
        <div className="h-full w-[calc(100%-80px)] absolute right-0">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl pl-20">NAME'S DASHBOARD</h1>
          <div className="h-[calc(100%-100px)] w-full overflow-y-scroll mt-10">
            <UnsolvedError />
            <UnsolvedError />
            <UnsolvedError />
            <SolvedError />
            <SolvedError />
            <SolvedError />
            <SolvedError />
            <SolvedError />
          </div>
        </div>
      </div>
    </div>
  )
}

const SolvedError = () => {
  return (
    <div className="h-[130px] w-auto border border-secondary mb-20 mx-20 rounded-2xl overflow-hidden bg-third relative mt-5">
      <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div>
      <div className="h-full ml-15 flex flex-col justify-center gap-3">
        <h2 className="font-roboto font-extrabold text-[#CACACA]">ERROR NAME</h2>
        <h2 className="font-roboto text-[#CACACA] text-[13px]">5th July, 2025 at 12:30am</h2>
      </div>
    </div>
  )
}

const UnsolvedError = () => {
  return (
    <div className="h-[130px] w-auto border border-[#FF0000] mb-20 mx-20 rounded-2xl overflow-hidden bg-[#310000] relative mt-5">
      <div className="h-[52px] w-[712px] bg-[#FF0000] rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div>
      <div className="h-full ml-15 flex flex-col justify-center gap-3 text-[#FF0000]">
        <h2 className="font-roboto font-extrabold ">ERROR NAME</h2>
        <h2 className="font-roboto text-[13px]">5th July, 2025 at 12:30am</h2>
      </div>
    </div>
  )
}

export default Dashboard