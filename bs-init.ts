import { create } from 'browser-sync'

export default () => {
  const bs = create()

  bs.init()

  return bs
}
