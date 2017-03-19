import * as React from 'react'
import { B } from 'b_'

System.import('./index.scss')

const b = B({
  tailSpace: '',
  elementSeparator: '_',
  modSeparator: '-',
  modValueSeparator: '--',
  classSeparator: ' '
})

export const cssPrefix = b(b('os', 'screensaver'), 'Circles')

export const Circles = () => (
  <div className={cssPrefix}>
    <div className={b(cssPrefix, 'content')}>
      <div className={b(cssPrefix, 'circle', { color: 'white' })}>
        <div className={b(cssPrefix, 'circle', { color: 'black', level: 1 })}>
          <div className={b(cssPrefix, 'circle', { color: 'white', level: 2 })}>
            <div className={b(cssPrefix, 'circle', { color: 'black', level: 3 })}>
              <div className={b(cssPrefix, 'circle', { color: 'white', level: 4 })}>
                <div className={b(cssPrefix, 'circle', { color: 'black', level: 5 })}>
                  <div className={b(cssPrefix, 'circle', { color: 'white' })}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
