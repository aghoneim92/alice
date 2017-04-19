import * as React from 'react'
import { StatelessComponent } from 'react'

import { resolve } from 'react-resolver'

import { pure } from 'recompose'

import { Editor } from './Editor'
import { Hackernews } from './Hackernews'
import { Terminal } from './Terminal'

import { genId } from '../../lib/genId'

import { Map } from 'immutable'

System.import('./index.scss')

const editorId = '292d57678e871ce5359fb2fa92cbf2e79fe5261afedac24c5c1b0975dfd868465009fdf7d4a3c6f3756ee528a41a185e52b564b55cb98545dce84da622a25295'

const editor = Map({
  id: editorId,
  Component: Editor,
  icon: (
    <svg
      fill="white"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      style={{ transform: 'scale3d(1.6, 1.6, 1.0)'}}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  ),
  title: 'Editor',
})

export const Icon: StatelessComponent<ResolvedProps> = ({
  src,
}) => (
  <img style={{ width: '90%', height: '90%'}} src={src}/>
)

const solitaireId = genId()

const SolitaireIcon = resolve({
  src: () => System.import('./solitaire.png')
})(Icon)

const solitaire = Map({
  id: solitaireId,
  Component: pure(() => <iframe
    style={{width: '100%', height: '100%', border: 0}}
    src="https://alice-65dad.firebaseapp.com/react-solitaire/"
  />),
  icon: <SolitaireIcon/>,
  title: 'Solitaire',
})

interface ResolvedProps {
  src: string
}
const HextrisIcon: StatelessComponent<any> = resolve({
  src: () => System.import('./hextris.png'),
})(Icon)

const hextrisId = genId()
const hextris = Map({
  id: hextrisId,
  Component: pure(() => <iframe
    style={{width: '100%', height: '100%', border: 0}}
    src="https://alice-65dad.firebaseapp.com/hextris/"
    />
  ),
  icon: <HextrisIcon/>,
  title: 'Hextris',
})

const HackernewsIcon = resolve({
  src: () => System.import('./Hackernews/ycombinator-logo.png'),
})(Icon)

const hackerNewsId = genId()
const hackerNews = Map({
  id: hackerNewsId,
  Component: Hackernews,
  icon: <HackernewsIcon/>,
  title: 'Hacker News',
})

const ThreeIcon = resolve({
  src: () => System.import('./three.png')
})(Icon)

const threeId = genId()
const three = Map({
  id: threeId,
  Component: () => (
    <iframe style={{ width: '100%', height: '100%' }} src="https://threejs.org/editor/"/>
  ),
  icon: <ThreeIcon/>,
  title: 'Three.JS',
})

const GBAIconEnhanced: StatelessComponent<any> = ({ src }) => (
  <img className="os_sidebar_appLauncher_icon" src={src}/>
)

const GBAIcon = resolve({
  src: () => System.import('./gba.png')
})(GBAIconEnhanced)

const gbaId = genId()
const gba = Map({
  id: gbaId,
  Component: pure(() => <iframe
    style={{width: '100%', height: '100%', border: 0}}
    src="http://endrift.github.io/gbajs/"
    />
  ),
  icon: <GBAIcon/>,
  title: 'GBA Emulator',
})

const TerminalIconEnhanced: StatelessComponent<any> = ({ src }) => (
  <img className="os_sidebar_appLauncher_icon" src={src}/>
)

const TerminalIcon = resolve({
  src: () => System.import('./Terminal/logo.svg')
})(TerminalIconEnhanced)

const terminalId = '4b73b5c737a27688320fc2a6eb17664f48e664d2c081e784d03229684dc0d876b9259f1e50dfa991dfc7a5e7b35c7f63b069013708fb465b3dfdddd1572511b7'
const terminal = Map({
  id: terminalId,
  Component: Terminal,
  icon: <TerminalIcon/>,
  title: 'Terminal',
})


export const Apps = Map<ImMap>({
  [editorId]: editor,
  [hackerNewsId]: hackerNews,
  [threeId]: three,
  [hextrisId]: hextris,
  [solitaireId]: solitaire,
  [terminalId]: terminal,
  [gbaId]: gba,
})
