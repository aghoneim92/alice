/// <reference path="./index.d.ts" />

import * as React from 'react'
import { PureComponent } from "react"

import Popover from 'react-popover'
import Webcam from 'react-webcam'


import { pure, withState } from 'recompose'
import { compose } from "ramda";

System.import('./index.scss')

export const cssPrefix = 'os_camera'

const enhancer = (compose as any)(
  withState('open', 'setOpen', false),
  withState('capturing', 'setCapturing', false),
  pure,
)

class CameraEnhanced extends PureComponent<CombinedProps, undefined> {
  ref?: typeof Webcam

  handleCaptureClick = () => {
    const {
      ref,
      props: {
        setCapturing,
        onCapture,
      },
    } = this
    
    setCapturing(true)

    if(ref) {
      onCapture(ref.getScreenshot())
    }
  }

  handleRef = (ref: typeof Webcam) => this.ref = ref

  render() {
    const {
      handleCaptureClick,
      handleRef,
      props: {
        capturing,
        open,
        setOpen,
      },
    } = this

    return (
      <div
        className={cssPrefix}
      >
        <Popover
          body={
            <div className={`${cssPrefix}_content`}>
              <div className={`${cssPrefix}_video${capturing ? ' os_camera_video-capturing' : ''}`}>
                <Webcam ref={handleRef} width='100%' height='100%'/>
              </div>
              <div className="os_camera_controls">
                <button
                  onClick={handleCaptureClick}
                  className="os_camera_captureButton"
                />
              </div>
            </div>
          }
          isOpen={open}
          place="below"
          target={
            <i className="fa fa-camera"/>
          }
          onOuterAction={() => setOpen(false)}
        >
          <i onClick={() => setOpen(!open)} className="fa fa-camera"/>
        </Popover>
      </div>
    )
  }
}

export const Camera = enhancer(CameraEnhanced)