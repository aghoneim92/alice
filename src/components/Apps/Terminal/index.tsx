import * as React from 'react'
import { PureComponent, FormEvent } from 'react'
import * as ReactList from 'react-list'

// interface CommandArgs {
//   structure: any
//   history: any[]
//   cwd: string
// }

// interface Command {
//   args: {
//     [key: number]: any;
//     [key: string]: any;
//   }
//   input: string
// }

// type Exec = (args: CommandArgs, cmd: Command) => void

// type Kernel = any

// type Node = (kernel: Kernel) => {
//   exec: Exec
// }

const respText = (res: any) => res.text()

export class Terminal extends PureComponent<any, any> {

  componentWillMount() {
    System.import('./index.scss')
  }

  state: {
    history: any[],
    executables: {
      [key: string]: Function
    }
  } = {
    history: [],
    executables: {}
  }

  handleProcessInput = (stdin: any) => {
    stdin.write('hi')
  }

  exec = (cmd: string) => {
    const { state: { history } } = this

    const withCmd = history.concat([{
      cwd: '/home',
      value: cmd,
    }])

    this.props.kernel.system(
      cmd,
      (pid: number, code: number) => console.log(`pid: ${pid}, code: ${code}`),
      this.handleProcessOutput,
      this.handleProcessError,
    )

    this.setState({ history: withCmd })
  }


  handleProcessOutput = (_: number, output: string) => this.setState({
    history: this.state.history.concat([{
      cwd: '',
      value: output,
    }])
  })

  handleProcessError = (_: number, error: string) => this.setState({
    history: this.state.history.concat([{
      cwd: '',
      value: error,
    }])
  })

  handleFetchResponse = (
    history: any[],
    method: string,
    url: string
  ) => (res: string) => this.setState({
    history: history.concat([{
      cwd: '',
      value: `Fetch complete: ${method} "${url}". Result:\n${res}`,
    }])
  })

  handleFetchError = (
    history: any[],
    method: string,
    url: string
  ) => (err: Error) => this.setState({
    history: history.concat([{
        cwd: '',
        value: `Fetch complete: ${method} "${url}". ${err.toString()}`,
    }])
  })

  fetch = (
    cmd: string,
    method = 'GET'
  ) => {
    const { handleFetchResponse, handleFetchError, props: { kernel }, state: { history } } = this

    const withoutName = cmd.split('fetch ')[1].trim()

    let outFile: string
    let url = withoutName

    if (cmd.includes('>')) {
      const split = withoutName.split('>')
      outFile = split[1].trim()
      url = split[0].trim()
    }

    const withCmd = history.concat([{ cwd: '', value: `fetch ${url}`}])

    fetch(url)
      .then(respText)
      .then(
        (content: string) => {
          if (outFile) {
            kernel.fs.writeFile(`/${outFile}`, content, (err: Error) => {
              if (err) {
                console.error(err)
              }
            })
          }
        }
      )
      .then(handleFetchResponse(withCmd, method, url))
      .catch(handleFetchError(withCmd, method, url))

    this.setState({ history: withCmd })
  }

  onCmd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const input = (e.target as HTMLFormElement).querySelector('input')
    if (input) {
      const cmd = input.value
      if (cmd.includes('fetch')){
        this.fetch(cmd)
      }
      else {
        this.exec(cmd)
      }
    }
  }

  prompt = () => (
    <div className="prompt">
      <form onSubmit={this.onCmd}>
        <span>$ </span>
        <input
          style={{display: 'inline-block', width: 'calc(100% - 20px)'}}
        />
      </form>
    </div>
  )

  renderItem = (index: number, key: string) => {
    const { prompt, state: { history } } = this

    const historyItem = history[index]
    const item = historyItem ?
      (<div>{`${historyItem.cwd}: ${historyItem.value}`}</div>)
    : prompt()

    return (
      <div key={key}>
        {item}
      </div>
    )
  }

  render() {
    const {
      state: {
        history,
      },
    } = this

    return  (
      <div className="os_terminal">
        <ReactList
          itemRenderer={this.renderItem}
          length={history.length + 1}
          type="uniform"
        />
      </div>
    )
  }
}

