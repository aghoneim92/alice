import React, { Component } from 'react'
import NavBar from './NavBar'

import './os.scss'

export default class OS extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('click', this.handleWindowClick)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize)
    document.removeEventListener('click', this.handleWindowClick)
  }

  handleLogoClick = () => this.setState({
    menuVisible: !this.state.menuVisible,
  })

  handleWindowClick = ({ target }) => {
    if (target.className !== 'os_logo') {
      if (target.parentNode) {
        this.handleWindowClick({ target: target.parentNode })
      } else {
        this.setState({
          menuVisible: false,
        })
      }
    }
  }

  handleWindowResize = () => this.setState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  render () {
    const {
      handleLogoClick,
      state: { width, height, menuVisible },
    } = this
    const imageProps = {
      xlinkHref: require('./background.jpg'),
      preserveAspectRatio: 'xMinYMin slice',
      width,
      height,
    }

    return (
      <div className="os">
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
        <NavBar onLogoClick={handleLogoClick} menuVisible={menuVisible}/>
      </div>
    )
  }
}
