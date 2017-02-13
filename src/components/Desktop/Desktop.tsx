import React, { ReactNode } from 'react'
import { createContainer } from 'react-transmit'
import { Map } from 'immutable'

import Windows from '../Windows/Windows'

export const cssPrefix = 'os_desktop'

export interface DesktopPropTypes {
  windows: Map<string, Window>;
  // focusedWindow: Window;
}

export interface IDesktop {
  (props: DesktopPropTypes): ReactNode;
}

const Desktop: IDesktop = ({
  windows,
}) => (
  <div className={cssPrefix} >
    <Windows windows={windows} />
  </div>
)

export default createContainer(
  Desktop, {
    fragments: {}
  }
)
//
// const getDesktop = (React, { array, string }, { pick }, {
//   FocusTrap,
//   Window,
//   WebView,
// }) => {
//   const windowComponents = {
//     WebView,
//   }
//   const Desktop =  => (
//
//
//           ({
//             type,
//             id,
//             ...rest
//           }) =>
//             <FocusTrap focusTrapOptions={{
//               fallbackFocus: '.os',
//             }} key={id}>
//               <Window id={id} {...rest}>
//                 {React.createElement(
//                   windowComponents[type],
//                   pick(
//                     Object.keys(windowComponents[type].propTypes),
//                     rest
//                   )
//                 )}
//               </Window>
//             </FocusTrap>
//         )
//       }
//     </div>
//   )
//
//   Desktop.propTypes = {
//     windows: array,
//     focusedWindow: string,
//   }
//
//   return Desktop
// }
//
// export const action = ([React, FocusTrap, ramda, Window, WebView]) =>
//   getDesktop(
//     React,
//     React.PropTypes,
//     ramda,
//     {
//       FocusTrap,
//       Window,
//       WebView,
//     }
//   )
