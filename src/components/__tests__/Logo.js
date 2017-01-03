import { expect } from 'chai'

import '../../lib/chaiPlugins'

import addBeforeEach from '../../lib/addBeforeEach'
import describe from '../../lib/describe'
import getChildren from '../../lib/getChildren'
import injectJsdom from '../../lib/injectJsdom'
import mount from '../../lib/mount'

import Logo, { cssPrefix } from '../Logo/Logo'
import Menu from '../Menu'

const menuVisible = true

addBeforeEach([
  injectJsdom,
  mount({
    Component: Logo,
    props: {
      menuVisible,
    },
    options: { spies: ['onClick'] },
  }),
  getChildren,
])

describe('Logo', ({ describe, it }) => {
  it('renders a div', ({ context: { wrapper } }) =>
    expect(wrapper).to.have.tagName('div')
  )

  it(`gives the div className ${cssPrefix}`, ({ context: { wrapper } }) =>
    expect(wrapper).to.have.className(cssPrefix)
  )

  describe('First Child', ({ it }) => {
    it('is a div', ({ context: { firstChild } }) =>
      expect(firstChild).to.have.tagName('div')
    )
    it('contains the word OS as logo', ({ context: { firstChild } }) =>
      expect(firstChild).to.have.text('OS')
    )
    it('calls handleLogoClick (curried) when it is clicked',
      ({ context: { firstChild, spies } }) => {
        expect(firstChild).to.have.prop('onClick')
        firstChild.simulate('click')
        expect(spies.onClick).to.have.been.called
      }
    )
  })

  describe('Second Child', ({ it }) => {
    it('is a Menu', ({ context: { secondChild } }) =>
      expect(secondChild).to.match(Menu)
    )
    it('is passed down the menuVisible prop as visible',
      ({ context: { secondChild } }) =>
        expect(secondChild).to.have.prop('visible', menuVisible)
    )
  })
})
