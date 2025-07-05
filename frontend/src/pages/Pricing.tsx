import NavigationBar from "../components/NavigationBar"

const Pricing = () => {
  return (
    <div className="h-full w-full">
      <NavigationBar position="relative"/>
      <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-3xl text-center mt-24">ONE PRICE, ZERO HASSLE</h1>
      <div className="flex justify-center gap-20 mt-24">
        <CardComponent price="10" duration="month" />
        <CardComponent price="100" duration="year" />
      </div>
    </div>
  )
}

const CardComponent = ({ price, duration }: { price: string, duration: string }) => {
  return (
    <div className="h-[450px] w-[300px] bg-third rounded-2xl relative">
      <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-20 left-1/2 transform -translate-x-1/2"></div>
      <div className="p-10 text-secondary">
        <div>
        <span className="font-roboto-flex font-extrabold text-4xl">${price}</span>
        <span className="font-roboto-flex text-sm">/{duration}</span>
        </div>
        <div className="mt-15">
          <p className="font-roboto text-sm mb-5">✔ Get instant mail on backend err.</p>
          <p className="font-roboto text-sm mb-5">✔ Get instant call on backend err.</p>
          <p className="font-roboto text-sm mb-5">✔ No hidden charges.</p>
        </div>
        <button className="h-7 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[10px] main-btn text-third absolute bottom-10 left-1/2 transform -translate-x-1/2">ENABLE ALERTS</button>
      </div>
    </div>
  )
}

export default Pricing