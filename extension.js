// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const SnippetInputPanel = require('./src/docSet');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "docgit" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	const docSet = vscode.commands.registerCommand('docgit.docSet', (snippetText) => {
		SnippetInputPanel.createOrShow(context.extensionUri, snippetText);
	});``

	const docSelectedCode = vscode.commands.registerCommand('docgit.docSelectedCode', function () {

		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			vscode.window.showErrorMessage('No active editor found');
			return;
		}
		const selection = editor.selection;
		vscode.window.showInformationMessage(JSON.stringify(selection));
		const selectedText = editor.document.getText(selection);

		const lines = selectedText.split('\n').splice(0, 2).join('\n');
		console.log(lines);
		vscode.commands.executeCommand('docView.focus');
		vscode.commands.executeCommand('docgit.docSet', lines);

		




		
	});






	context.subscriptions.push(docSelectedCode);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
