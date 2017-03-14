import React, { Component } from 'react'
import { addDecorator, storiesOf, action, linkTo } from '@kadira/storybook'
import Button from './Button'
import Welcome from './Welcome'
import EventListener, {withOptions} from 'react-event-listener'

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))

const wrapClick = target => (
  <div onClick={action('clicked')}>{target()}</div>
)

addDecorator(wrapClick)

storiesOf('Intro', module)
  .add('prompt', () => (
    <div>Press space to start</div>
  ))
  .add('greeting', () => (
    <span>greeting followed by question</span>
  ))
  .add('response', () => (
    <span>repsonse based on response</span>
  ))
