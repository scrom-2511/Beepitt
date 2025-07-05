import NavigationBar from "../components/NavigationBar"

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <NavigationBar position="fixed" />
      <div className="h-full w-full flex">
        <div className="h-[70%] w-[80px] bg-third fixed top-1/2 transform -translate-y-1/2 rounded-2xl overflow-hidden">
          <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-1/2 transform -translate-y-1/2"></div>
        </div>
        <div className="h-full w-full ml-[80px]">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl m-15 mt-15">HEY, NAME</h1>
          <div className="h-full w-full">
              <div className="h-[50px] w-auto bg-white m-15"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard