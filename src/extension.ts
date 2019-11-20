import { window, commands, ExtensionContext } from 'vscode';
import cp = require('child_process');

function currentPageUri() {
	return window.activeTextEditor
		&& window.activeTextEditor.document
		&& window.activeTextEditor.document.uri;
}

export function activate(context: ExtensionContext) {
	let disposable = commands.registerCommand('extension.revealInForkLift', () => {
		const path = currentPageUri();

		if (!path) {
			return false;
		}
		cp.exec(`open -a Forklift ${path.fsPath}`, (err: any) => {
			if (err) {
				console.log('error: ' + err);
			}
		});
	});
	context.subscriptions.push(disposable);
}
export function deactivate() { }
