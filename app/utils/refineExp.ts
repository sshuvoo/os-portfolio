export function refineExp(exp: string) {
  let refined = ''
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === '×') {
      refined += '*'
      continue
    } else if (exp[i] === '÷') {
      refined += '/'
      continue
    } else refined += exp[i]
  }
  return refined
}
