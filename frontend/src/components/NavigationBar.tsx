type Position ='relative' | 'fixed';

const NavigationBar = ({position}:{position:Position}) => {
  const buttons = ["DASHBOARD", "PRICING", "DOCS", "SIGNIN"];
  return (
    <div className="h-[70px] w-full mt-10 pr-30 font-roboto font-bold flex justify-end text-sm text-secondary z-20" style={{position}}>
      {buttons.map((btn, index)=>(
        <button key={index} className="button-navigation">{btn}</button>
      ))}
    </div>
  )
}

export default NavigationBar