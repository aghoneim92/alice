import React, { Component } from 'react'
import NavBar from './NavBar'
import Joyride from 'react-joyride'
import Wallpaper from './Wallpaper'
import Windows from './windows'
import { generate } from 'randomstring'

import { DEV } from '../constants'

import './os.scss'

const steps = () => ([{
  selector: '.os_navbar',
  title: 'First Step',
  text: 'Start',
  position: 'bottom-right',
  type: 'hover',
  style: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '0',
    color: '#fff',
    mainColor: '#ff4456',
    textAlign: 'center',
    width: '29rem',
    beacon: {
      inner: 'rgba(0, 0, 0, 0.0)',
      outer: '#000',
    },
    button: {
      display: 'none',
      // or any style attribute
    },
    skip: {
      color: '#f04',
    },
    hole: {
      backgroundColor: 'RGBA(201, 23, 33, 0.2)',
    },
  },
}])

export default class OS extends Component {

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
    steps: [],
    windows: [],
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('click', this.handleWindowClick)
    this.setState({
      firstTime: !window.localStorage.getItem('notFirstTime'),
      steps: steps(),
    })
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowResize)
    document.removeEventListener('click', this.handleWindowClick)
  }

  handleLogoClick = () => this.setState({
    menuVisible: !this.state.menuVisible,
  })

  checkForLinkClick = e => {
    const { target: { nodeName, parentNode, href } } = e
    if (nodeName !== 'A') {
      if (parentNode) {
        this.checkForLinkClick({
          target: parentNode,
          preventDefault: ::e.preventDefault,
        })
      }
    } else if (!DEV) {
      e.preventDefault()
      const window = this.state.windows.find(
        ({ type, source }) => type === 'WebView' && source === href
      )
      if (window) {
        this.setState({
          focusedWindow: window.id,
        })
      } else {
        const id = generate(7)
        this.setState({
          windows: this.state.windows.concat([{
            type: 'WebView',
            source: href,
            id,
          }]),
          focusedWindow: id,
        })
      }
    }
  }

  checkForLogoClick = ({ target: { parentNode, className } }) => {
    if (className !== 'os_logo') {
      if (parentNode) {
        this.checkForLogoClick({ target: parentNode })
      } else {
        this.setState({
          menuVisible: false,
        })
      }
    }
  }

  handleWindowClick = e => {
    this.checkForLogoClick(e)
    this.checkForLinkClick(e)
  }

  handleWindowResize = () => this.setState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  render () {
    const {
      handleLogoClick,
      state: {
        firstTime,
        width,
        height,
        menuVisible,
        steps,
        windows,
        focusedWindow,
      },
    } = this
    const imageProps = {
      xlinkHref: require('./background.jpg'),
      preserveAspectRatio: 'xMinYMin slice',
      width,
      height,
    }

    return (
      <div className="os">
        <Wallpaper {...{width, height, imageProps}} />
        <NavBar
          firstTime={firstTime}
          onLogoClick={handleLogoClick}
          menuVisible={menuVisible}
        >
          <Joyride
            type="continuous"
            run={firstTime}
            steps={steps}
            debug={DEV}
          />
        </NavBar>
        <Windows {...{windows, focusedWindow}}/>
      </div>
    )
  }
}
