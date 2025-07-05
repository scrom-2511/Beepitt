type Position ='relative' | 'fixed' | 'static';

const NavigationBar = ({position}:{position:Position}) => {
  const buttons = ["DASHBOARD", "PRICING", "DOCS", "SIGNIN"];
  return (
    <div className="h-[100px] w-full pr-30 font-roboto font-bold flex justify-end text-sm text-secondary z-20 bg-primary" style={{position}}>
      {buttons.map((btn, index)=>(
        <button key={index} className="button-navigation">{btn}</button>
      ))}
    </div>
  )
}

export default NavigationBar