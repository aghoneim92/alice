import { error } from "./../lib/logging"
import * as isRunning from "is-running"
import * as terminate from "terminate"
import { existsSync, readFileSync } from "fs"
import { exec } from "child_process"

import { SERVER_CMD } from "./../constants/index"

const readIfExists: (file: string) => (boolean | string) = file => existsSync(file) && readFileSync(file).toString()
const readPid: (file: string) => number = file => ~~readIfExists(file)

export const spawnServer =  () => exec(SERVER_CMD)

export function findAndTerminate(file: string) {
  const pid = readPid(file)

  if (pid && isRunning(pid)) {
    terminate(pid, (err: Error) => err && error(err))
  }
}
