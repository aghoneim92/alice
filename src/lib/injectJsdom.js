import { jsdom } from 'jsdom'

export default ({ context }) => context.document = jsdom()
