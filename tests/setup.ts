import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
// import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers'


// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// hooks are reset before each suite so this does cleanup after each test case
afterEach(() => {
  cleanup()
})