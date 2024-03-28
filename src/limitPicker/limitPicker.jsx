import React from 'react'
import './limitPicker.css'

function LimitPicker({values,selectedValue,onLimitCallback}) {
  
  return (
    <div className='limitContainer'>
        
        {values.map((el,index)=>{
            return(
                <div className='tabsContainer' onClick={()=>{onLimitCallback(el)}} style={{backgroundColor:selectedValue == el?'black':'transparent',margin:5}}>
                    <p style={{color:selectedValue == el?'white':'black'}}>{el}</p>
                    {index != 3 && <div className='borderTag'>

                    </div>}
                </div>
            )
        })}

    </div>
  )
}

export default LimitPicker