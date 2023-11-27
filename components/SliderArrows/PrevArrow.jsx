import React from 'react';

const PrevArrow = ({ onClick }) => {
  return (
    <div onClick={onClick} className='absolute right-12 -top-14 text-4xl productSliderArrow' type='button'>
      <i className="icon-prev-arrow" style={{color: onClick ? "#1190ff" : "#d1e9ff"   }}/>
    </div>
  );
};

export default PrevArrow;