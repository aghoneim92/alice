import { Webcam } from 'react-webcam';
import { StatelessComponent } from 'react';
import '.'

declare module '.' {
  type Image = string
  interface CameraProps {
    onCapture: (image: Image) => void
  }

  type Screenshot = string

  interface InternalState {
    open: boolean
    capturing: boolean
    ref: any
  }

  type Setter<T> = (value: T) => void

  interface StateCallbacks {
    setOpen: Setter<boolean>
    setCapturing: Setter<boolean>
    setRef: Setter<typeof Webcam>
  }

  interface DerivedProps {
    onCaptureClick: () => void
  }

  interface CombinedProps
    extends
      CameraProps,
      InternalState,
      StateCallbacks,
      DerivedProps {}

  type CameraComponent = StatelessComponent<CombinedProps>
}