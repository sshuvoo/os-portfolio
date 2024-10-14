export const commands = [
  'help',
  'clear',
  'ls',
  'pwd',
  'cd',
  'cat',
  'exit',
  'node',
]

export const commandsHelp = [
  {
    command: 'cat <directory>',
    action: 'To display the contents of a directory/file',
  },
  {
    command: 'node',
    action: 'To open console mode, run your JavaScript',
  },
  { command: 'clear', action: 'To clear the terminal' },
  { command: 'ls', action: 'To list all files and directories' },
  { command: 'pwd', action: 'To print the current working directory' },
  { command: 'cd', action: 'To change the directory' },
  { command: 'exit', action: 'To exit the terminal' },
  { command: 'help', action: 'To show all available commands' },
]
