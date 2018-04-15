import React from 'react'
import { sum, re } from './sum'

// TODO: Delete this file
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

test('returns header', () => {
  expect(re()).toEqual(<h1>Foo</h1>)
})
