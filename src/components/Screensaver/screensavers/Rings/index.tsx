import * as React from 'react'
import { StatelessComponent } from 'react'

import { range } from 'ramda'

const els = range(1, 30)

System.import('./index.scss')

export const cssPrefix = 'os_screensaver_rings'

export const Rings: StatelessComponent<undefined> = () => (
  <div className={cssPrefix}>
    <div className={`${cssPrefix}_container`}>
    {
      els.map(
        n => <div key={n} className={`ring el-${n}`}/>
      )
    }
    </div>
  </div>
)
