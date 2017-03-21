import * as React from 'react'
import { StatelessComponent } from 'react'

import { resolve } from 'react-resolver'

import { Editor } from './Editor'
import { Hackernews } from './Hackernews'

import { genId } from '../../lib/genId'

import { Map } from 'immutable'

import { pure } from 'recompose'

const editorId = '292d57678e871ce5359fb2fa92cbf2e79fe5261afedac24c5c1b0975dfd868465009fdf7d4a3c6f3756ee528a41a185e52b564b55cb98545dce84da622a25295'
const editor = Map({
  element: 'insert editor here',
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
  src: () => System.import('../../solitaire.png')
})(Icon)

const solitaire = Map({
  id: solitaireId,
  Component: pure(() => <iframe
    style={{width: '100%', height: '100%', border: 0}}
    src="http://pl12133.github.io/react-solitaire/"
  />),
  icon: <SolitaireIcon/>,
  title: 'Solitaire',
})

interface ResolvedProps {
  src: string
}

const HextrisIcon: StatelessComponent<any> = resolve({
  src: () => System.import('../../hextris.png'),
})(Icon)

const hextrisId = genId()
const hextris = Map({
  id: hextrisId,
  Component: pure(() => <iframe
    style={{width: '100%', height: '100%', border: 0}}
    src="http://hextris.io"
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

// const snakeId = genId()
// const snake = Map({
//   id: snakeId,
//   icon: (
//     <img src="../../snake.ico"/>
//   ),
//   title: 'Snake',
//   type: SNAKE,
// })
// const nesId = genId()
// const nes = Map({
//   id: nesId,
//   icon: resolve('img', 'onImgChange', null)((
//     ({
//       img,
//     }) => (
//       <img src={img}/>
//     )
//   )as (({img}: {img: string}) => any)),
//   type: NES,
// })

export const Apps = Map<ImMap>({
  [editorId]: editor,
  [hextrisId]: hextris,
  [solitaireId]: solitaire,
  [hackerNewsId]: hackerNews,
  // [nesId]: nes,
  // [snakeId]: snake
})
