import React, { PropTypes } from 'react'

const Wallpaper = ({ width, height, imageProps }) => (
  <svg
    width="100%"
    height="100%"
    className="os_wallpaper"
    viewBox={`0 0 ${width} ${height}`}
  >
    <filter id="filter" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur result="blur" in="SourceGraphic" stdDeviation="3.5"/>
      <feFlood
        result="floodFill"
        width="110%"
        height="110%"
        floodColor="white"
        floodOpacity="0.3"
      />
      <feBlend result="blend" in="blur" in2="floodFill" mode="lighten"/>
    </filter>
    <image {...imageProps}/>
    <image
      {...imageProps}
      height={20}
      filter="url(#filter)"
    />
  </svg>
)

Wallpaper.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageProps: PropTypes.object,
}

export default Wallpaper
