/// <reference path='../../index.d.ts'/>
import { log } from './logging'

import * as RiveScript from 'rivescript/lib/rivescript'

const handleBotLoad = (bot: typeof RiveScript, resolve: Function) =>
  (batchNum: number) => {
    debugger
    const data = bot.deparse()
    log(bot.stringify(data))
    bot.sortReplies()

    log(batchNum)

    const reply = bot.reply('local-user', 'Hello, bot!')
  log(reply)
    resolve()
  }

export const getBot = () => new Promise(
  (resolve, reject) => {
    const bot = new RiveScript({utf8: true})

    bot.unicodePunctuation = new RegExp(/[.,!?;:]/g)

    bot.loadFile(
      'http://localhost:7777/intro.rive',
      handleBotLoad(bot, resolve),
      reject
    )
  }
)
