// import Terminal from 'react-bash'
// import traverseDir from '../lib/traverseDir'
// import GitHubApi from 'github'
// import { Boot } from 'browsix'
/// <reference path='../index.d.ts'/>
import React, { PureComponent } from 'react'
import Helmet from 'react-helmet'
import resolver from 'react-tiles/src/react-router-resovler'
import Tiles from 'react-tiles'
import connect from '../lib/connect'
import derive from '../lib/derive'
import './os.scss'

import { APP_NAME, APP_URL } from '../constants/index'

export interface OSProps {
  currentWindow?: Window;
}

export const cssPrefix = 'os'

@derive
class OS extends PureComponent<OSProps, undefined>{
  // ps1 = '$ ';
  // github: {};

  render() {
    const {
      props: {
        currentWindow,
      },
    } = this;

    console.log('currentWindow', currentWindow)

    return (
      <div
        className={`${
          cssPrefix
        }`}
        style={{
          backgroundImage: `url('${
            APP_URL
          }${
            require('../../img/background.jpg')
          }')`,
        }}
      >
        <Helmet
          title={`${APP_NAME}${currentWindow ? `| ${currentWindow.name}` : ''}`}
        />
        <Tiles resolver = { resolver }/>
      </div>
    )
  }
}

export default connect(OS)


//   const { state: { kernel: { fs } } } = this;
//   if(fs) {
//     return (
//         // ...{
//         //   history,
//         //   structure,
//         //   theme,
//         // }
//         structure={traverseDir(fs, '.')}
//
//                 const newStructure = merge(structure, {
//                   [ repo ]: traverseDir(fs, repo)
//                 })
//                 const newCwd = '';
//                 const newHistory = history.concat([]);
//
//                 return merge(ret, {
//                   structure: newStructure,
//                   cwd: newCwd,
//                   history: newHistory,
//                 })
//               }
//
//               return ret;
//             },
//           }
//         }}
//         prefix='user@alice'
//       />
//     )
//   }
//
// ${
  // idle ? ` ${cssPrefix}-idle` : ''
// }
//
// // this.github = new GitHubApi({
//   debug: true,
//   protocol: "https",
//   headers: {
//     "user-agent": "Alice-1.0.0" // GitHub is happy with a unique user agent
//   },
//   followRedirects: false,
//   timeout: 5000,
// })
// Boot(
//   'LocalStorage',
//   [null, 'fs', true],
//   // ['index.json', 'fs', true],
//   (err: any, kernel: any) => {
//     if (err) {
//       console.error(err)
//     }
//     this.setState({
//       kernel,
//     })
//   },
//   { readOnly: false },
// )
