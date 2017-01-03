import { test } from 'ava'

export default function describe (testDescription, fn) {
  let its = []
  const it = (description, fn) => its = its.concat([{ description, fn }])
  fn({
    describe: (nestedTestDescription, fn) => describe(
      `${testDescription} - ${nestedTestDescription}`,
      fn
    ),
    it,
  })
  its.forEach(
    ({ description, fn }) => test(
      `${testDescription} - ${description}`,
      fn
    )
  )
}
