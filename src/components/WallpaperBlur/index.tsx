import * as React from 'react'
import { StatelessComponent } from 'react'
export const cssPrefix = 'os_wallpaperBlur'

System.import('./index.scss')

interface WallpaperBlurProps {
  background?: string
  width: number
  height: number
}

export const WallpaperBlur: StatelessComponent<WallpaperBlurProps> = ({
  background = '',
  width,
  height,
}) => (
  <svg
    width="95vw"
    height="10vh"
    className={cssPrefix}
    viewBox={`0 0 ${width} ${0.1 * height}`}
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
    <image
      x={0}
      y={0}
      xlinkHref={background}
      width={width}
      height="10vh"
      filter="url(#filter)"
      preserveAspectRatio="xMinYMin slice"
    />
  </svg>
)

