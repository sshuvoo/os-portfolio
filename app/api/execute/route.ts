import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  let consoleOutput = ''

  const originalConsoleLog = console.log
  console.log = (...args) => {
    consoleOutput += args.join(' ') + '\n'
    originalConsoleLog(...args)
  }

  let result
  try {
    result = eval(body.code)
  } catch (error) {
    if (error instanceof Error) {
      result = `${error.message}`
    }
  }

  console.log = originalConsoleLog
  return NextResponse.json({ console: consoleOutput.trim(), error: result })
}
