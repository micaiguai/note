// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { type ExtensionContext, commands, env, window, workspace } from 'vscode'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  const workspaceAbsPath = workspace
    .workspaceFolders
    ?.map(folder => folder.uri.path)[0]
  if (!workspaceAbsPath)
    return
  const configPath = (await readdir(
    workspaceAbsPath,
    { recursive: true },
  ))
    .filter(filePath => !filePath.includes('node_modules'))
    .filter(filePath => filePath.includes('note-manage.config.json'))[0]
  const config = JSON.parse(await readFile(resolve(workspaceAbsPath, configPath), { encoding: 'utf-8' }))
  const startupFinishedDisposable = commands.registerCommand('onStartupFinished', () => {
    window.showInformationMessage('onStartupFinished')
  })
  if (!config)
    return
  const filePaths = await readdir(
    resolve(workspaceAbsPath, 'notes'),
    { recursive: true },
  )
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = commands.registerCommand('note-manage.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const message = '123'
    window.showInformationMessage(message)
  })
  const disposable2 = commands.registerCommand('note-manage.newCommand', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const message = 'wow!'
    console.log('message :', message)
    window.showInformationMessage(message)
  })

  context.subscriptions.push(disposable)
  context.subscriptions.push(disposable2)
  context.subscriptions.push(startupFinishedDisposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
