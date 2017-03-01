import * as React from 'react'
import { PureComponent } from 'react'
// import TypeWriter from 'react-typewriter'
import { WINDOW } from '../../constants/index'

interface IntroProps {
  [key: string]: any;
}

const text = ['Hi, I\'m Alice!', 'And you?']
const utterances = text.map(paragraph => WINDOW && new SpeechSynthesisUtterance(paragraph))
const speak = WINDOW && speechSynthesis.speak.bind(speechSynthesis)

interface IntroState {
  currentParagraph: number;
}

// const delayMap = [',', '!', '.', '?'].map(
//   (at: string) => ({
//     at,
//     delay: 400,
//   })
// )

const cssPrefix = 'os_intro'

export default class Intro extends PureComponent<IntroProps, IntroState> {
  state = {
    currentParagraph: 0
  }

  componentDidMount() {
    utterances.forEach(speak)
  }

  render() {
    // const { state: { currentParagraph } } = this
    return <div className={cssPrefix} >
      {/*<TypeWriter
        typing={1}
        delayMap={delayMap}
      >
      {
        text.map(
          (paragraph: string, index: number) => (
            <p className={`${cssPrefix}_text`} key={index}>{paragraph}</p>
          )
        )
      }
      </TypeWriter>*/}
    </div>
  }
}
