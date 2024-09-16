const vscode = require('vscode');

class SnippetInputPanel {
  static currentPanel = undefined;
  static viewType = 'snippetInputPanel';

  constructor(panel, extensionUri, snippetText) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._disposables = [];

    // Update the panel with the provided snippet
    this._update(snippetText);

    // Handle panel disposal
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  static createOrShow(extensionUri, snippetText) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // Create and show the webview panel
    const panel = vscode.window.createWebviewPanel(
      SnippetInputPanel.viewType,
      'Snippet Input',
      column || vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    SnippetInputPanel.currentPanel = new SnippetInputPanel(panel, extensionUri, snippetText);
  }

  _update(snippetText) {
    // Set the HTML content for the webview
    this._panel.webview.html = this._getHtmlForWebview(snippetText);
  }

  dispose() {
    SnippetInputPanel.currentPanel = undefined;
    this._panel.dispose();

    // Dispose all listeners and disposables
    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  _getHtmlForWebview(snippetText) {
    // HTML content for the webview
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Snippet Input</title>
      </head>
      <body>
        <pre>${snippetText}</pre>
        <h4>Enter your input:</h4>
        <input type="text" id="inputBox" style="width: 100%;" />
      </body>
      </html>
    `;
  }
}

module.exports = SnippetInputPanel;
