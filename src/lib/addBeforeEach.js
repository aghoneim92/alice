import { test } from 'ava'

export default beforeEaches => test.beforeEach(
  t => beforeEaches.forEach(beforeEach => beforeEach(t))
)
