/*import { flatten } from 'ramda'

import * as React from 'react'
import { PureComponent, ReactElement, StatelessComponent } from 'react'

import { derive, track } from 'react-derive'
import { resolve } from 'react-resolver'
// import TypeWriter from 'react-typewriter'

// import { VoiceRecognition } from 'react-voice-components'

import { withState } from 'recompose'

import { WINDOW } from '../../constants/index'
// import { getBot } from '../../lib/brain'
import { error } from '../../lib/logging'

System.import('./index.scss')

// const grammar = '#JSGF V1.0 grammar options public <option> = yes | no'
const speak = WINDOW && speechSynthesis.speak.bind(speechSynthesis)

// const windowAsAny: any = WINDOW ? window : {}
// const SpeechRecognition = windowAsAny.SpeechRecognition || windowAsAny.webkitSpeechRecognition
// const SpeechGrammarList = windowAsAny.SpeechGrammarList || windowAsAny.webkitSpeechGrammarList

// const delayMap = [',', '!', '.', '?'].map(
//   (at: string) => ({
//     at,
//     delay: 0,
//   })
// )

const cssPrefix = 'os_intro'

type Setter<T> = (value: T) => void

interface StateSetters {
  setTyping: Setter<number>
  setSequence: Setter<string>
}

interface ContentObject {
  type: string
  content: Content
}

type Content = ContentObject | any;

// interface Paragraph extends ContentObject {
//   content: string[]
// }

// interface Choices extends ContentObject {
//   content: string // change this
// }

interface Screen {
  type: string
  response?: string
  content?: Content
  next?: string
}

interface ObjectOf<T> {
  [key: string]: T
}

interface SequenceConfig {
  start: string
  screens: ObjectOf<Screen>
}

interface AsyncProps {
  sequenceConfig: SequenceConfig
}

interface DerivedProps {
  sequence: Screen
  sequences: ObjectOf<Screen>
}

interface InternalState {
  typing: number
  currentScreen: string
  locale: string
}

interface IntroProps {

}
type CombinedProps = IntroProps
                   & AsyncProps
                   & InternalState
                   & DerivedProps
                   & StateSetters

const textToUtterances = (text: string[]) => text.map(
      paragraph =>
        WINDOW
 && new SpeechSynthesisUtterance(paragraph)
    )

const findSamantha = (voices: any[]) => voices.find(
  voice => voice.name === 'Samantha'
)
/*
const Line: StatelessComponent<{content: string}> = ({
  content
}) => (
  <span>
    <span>{content}</span><br/>
  </span>
)*/

/*const handleNonArrayContent: (content: any, type: string) => ReactElement<any> = (
  content,
  type
) => {
  return type === 'choice' ? (
    
  ) : <Line content = {content}/>
}

const handleArrayContent = (type: string) => (content: any): any =>
  type === 'choice' ?
    handleNonArrayContent(content, type)
   : (
    <p>
    {
      content.map(
        (content: any, index: number) => (
          <span key={index}>
          {
            handleNonArrayContent(content, type)
          }
          </span>
        )
      )
    }
    </p>
  )

const handleContent = (type: string) => (content: Content): any => {
  if(typeof content === 'object') {
    if(Array.isArray(content)) {
      return flatten(content.map(
        (content, index) => (
          <div key={index}>
            {handleArrayContent(type)(content)}
          </div>
        )
      ))
    }
    if(content.content) {
      return handleContent(content.type)(content.content);
    }
  }

  return handleNonArrayContent(content, type)
}*/
/*
const renderParagraph = (content: string[]) => (
  <p>
  {
    flatten(
      content.map(
        (line, index) => [
          <span key={2 * index}>{line}</span>,
          <br key={2 * index + 1}/>
        ]
      )
    )
  }
  </p>
)

const contentRenderers = {
  paragraph: renderParagraph,
  choices: renderChoices,
}

const renderContent = ({
  type,
  content
}: Content) => {

}

const renderScreen = ({
  type,
  response,
  content,
  next,
}: Screen) => {
  if(content) {
    const renderedContent = content.map(renderContent)

    )
  }
}

@withState('locale', 'setLocale', 'en-US')
@withState('currentScreen', 'setSequence', '')
@resolve(
  'sequenceConfig',
  ({
    locale,
  }: CombinedProps) =>
    System.import(`../../sequences/${locale}/intro.yml`)
          .catch(error)
)
@withState('typing', 'setTyping', 1)
@derive({
  screens: track('sequenceConfig')(
    ({
      sequenceConfig: {
        screens = {},
      } = {
        screens: {},
      },
    }: CombinedProps) => screens || {},
  )
})
@derive({
  currentScreen: track('sequenceConfig', 'currentScreen')(
    ({
      sequenceConfig: {
        start = ''
      } = {
        start: ''
      },
      currentScreen,
    }: CombinedProps) =>
      currentScreen.length ?
        currentScreen
      : start
  ),
})
@derive({
  sequence: track('sequences', 'currentScreen')(
    ({
      sequences,
      currentScreen,
    }: CombinedProps) => sequences[currentScreen]
  )
})
class IntroComponent extends PureComponent<CombinedProps, undefined> {
  voices?: any
  utterances?: any
  recognition?: any
  speechRecognitionList?: any

  setUtterances = (text: string[]) => {
    const Samantha = findSamantha(this.voices)
    const utterances = textToUtterances(text)

    this.utterances = utterances

    this.utterances.forEach(
      (utterance: any) =>
        utterance.voice = Samantha
    )
  }

  updateVoices = () =>
    this.voices = ((speechSynthesis as any).getVoices())

  handleRecognitionResult = () => {*/
    // const { results: [[{ transcript, confidence }]] } = e
    // const {
    //   props: {
    //     setSequence,
    //     setTyping,
    //     sequence,
    //   }
    // } = this
    // const choice = transcript.toLowerCase()

    // console.log('choice:', choice)
    // console.log(`Confidence: ${confidence}`)

    // if(confidence >= 0.8) {
    //   let paragraph = ''
    //   if(choice.includes('yes')) {
    //     console.log('yassssss');

    //     this.next = true
    //     paragraph = 'thanks'

    //   } else if (choice.includes('no')) {
    //     paragraph = 'okay'
    //   }

    //   setSequence(paragraph)

    //   const text = sequences[paragraph]

    //   this.setUtterances(text)

    //   setTyping(0)
    //   setImmediate(
    //     () => setTyping(1)
    //   )
    //   this.handleTyped()
    // }
  // }des
/*
  handleRecognitionSpeechEnd = () => {
    this.recognition.stop()
    this.props.setTyping(-1)
  }

  handleRecognitionNoMatch = () => {
    console.error('no fucking match')
  }

  handleRecognitionError = console.error.bind(console)

  handleTyped = () => {
    if(this.next) {
      this.utterances.forEach(speak)
      this.next = false
    }
  }

  waitForResponse = () => {
    // const {
    //   props: {
    //     setTyping,
    //     sequence
    //   },
    //   recognition,
    // } = this

    // setTyping(0)
    // const lastLine: string = last(text)

    // if(lastLine.includes('yes or no')) {
    //   recognition.start()
    // }
  }

  componentDidMount() {
    // const {
    //   handleRecognitionError,
    //   handleRecognitionNoMatch,
    //   handleRecognitionResult,
    //   handleRecognitionSpeechEnd,
    //   setUtterances,
    //   updateVoices,
    // } = this

    // updateVoices()
    // if(this.props.text) {
    //   setUtterances(this.props.text)
    // }
    // const recognition = new SpeechRecognition()
    // const speechRecognitionList = new SpeechGrammarList()
    // speechRecognitionList.addFromString(grammar, 1)
    // recognition.grammars = speechRecognitionList
    // recognition.continuous = false
    // recognition.lang = 'en-US'
    // recognition.interimResults = false
    // recognition.maxAlternatives = 1

    // recognition.addEventListener('result', handleRecognitionResult)
    // recognition.addEventListener('speechend', handleRecognitionSpeechEnd)
    // recognition.addEventListener('nomatch', handleRecognitionNoMatch)
    // recognition.addEventListener('error', handleRecognitionError)

    // this.recognition = recognition
  }

  componentWillUnmount() {
    const {
      handleRecognitionError,
      handleRecognitionNoMatch,
      handleRecognitionResult,
      handleRecognitionSpeechEnd,
      recognition,
      updateVoices,
    } = this
    const synth = speechSynthesis as any

    synth.removeEventListener('voiceschanged', updateVoices)

    recognition.removeEventListener('result', handleRecognitionResult)
    recognition.removeEventListener('speechend', handleRecognitionSpeechEnd)
    recognition.removeEventListener('nomatch', handleRecognitionNoMatch)
    recognition.removeEventListener('error', handleRecognitionError)
  }

  next = true

  render() {
    const {
    //   handleTyped,
    //   waitForResponse,
      props: {
      sequence,
    //     typing,
      }
    } = this

    const finalContent = renderSequence(sequence)

    return (
      <div className={cssPrefix}>
      {finalContent}
      </div>
    )
  }
}

export const Intro: StatelessComponent<IntroProps> = (
  IntroComponent as any
)

export default Intro*/


//<TypeWriter
//   typing={typing}
//   onTyped={handleTyped}
//   onTypingEnd={waitForResponse}
//   delayMap={delayMap}
// >
// {
//   text.map(
//     (paragraph: string, index: number) => (
//       <p className={`${cssPrefix}_text`} key={index}>{paragraph}</p>
//     )
//   )
// }
// </TypeWriter>

// const topics = [{
//   topic: 'yes',
//   samples: ['yes', 'yeah', 'yepp', 'ok', 'okay', 'sure', 'ja', 'si', 'oui', 'da']
// }, {
//   topic: 'no',
//   samples: ['no', 'nope', 'non', 'nein', 'niet']
// }]

// const trainingData = flatten(topics.map(
//   ({
//     topic,
//     samples,
//   }) => samples.map(
//     sample => [topic, sample]
//   )
// ))

// @resolve(
//   'bot',
//   () => getBot().catch(error)
// )*/

export default {}
