import React from 'react'

const NextArrow = ({ onClick }) => {
  return (
    <>
        <div onClick={onClick} className='absolute right-0 -top-14 text-4xl productSliderArrow' type='button'>
            <i className="icon-next-arrow" style={{color: onClick ?  "#1190ff": "#d1e9ff" }}/>
        </div>
    </>
  )
}

export default NextArrow