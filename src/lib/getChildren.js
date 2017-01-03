const orders = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eigth',
  'ninth',
  'tenth',
]

export default ({ context }) => {
  const children = context.wrapper.children()
  context.children = []
  children.forEach(
    child => context.children = context.children.concat([ child ])
  )
  orders.slice(0, children.length).forEach(
    (order, index) =>
      context[`${order}Child`] = context.children[index]
  )
}
