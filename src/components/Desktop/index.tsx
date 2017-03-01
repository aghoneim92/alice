import React, { StatelessComponent } from 'react'

// import * as graph from 'fbgraph'

export const cssPrefix = 'os_desktop'

export interface DesktopProps {}

export const Desktop: StatelessComponent<DesktopProps> = ({
  children
}) => (
  <div className={cssPrefix} >
    {children}
  </div>
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
