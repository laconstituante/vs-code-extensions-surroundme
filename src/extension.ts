'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let isTextCorrectlySelected = () =>{
        let selection = vscode.window.activeTextEditor.selection;
        let line_start = selection.start.line;
        let char_Start = selection.start.character;
        let cursorLine = selection.active.line;
        let cursorChar = selection.active.character
        if(line_start == cursorLine && char_Start == cursorChar){
            vscode.window.showInformationMessage('Please select text from start to end. not the other way around.');
            return false;
        }
        return true;
    }
    
    let surroundWithFunction = (f) =>{
        let selection = vscode.window.activeTextEditor.selection;
        let line_start = selection.start.line;        
        let char_numb_start = selection.start.character;  
        
        if(!isTextCorrectlySelected()){            
            return;
        }
        let left_snippet = new vscode.SnippetString(`${f}(`);
        let right_snippet = new vscode.SnippetString(")");
        let firstLine = new vscode.Position(
            line_start,
            char_numb_start);
        let EndLine = new vscode.Position(
            line_start,
            selection.active.character);
        vscode.window.activeTextEditor.insertSnippet(right_snippet,EndLine,{ undoStopBefore: false, undoStopAfter: false });
        vscode.window.activeTextEditor.insertSnippet(left_snippet,firstLine,{ undoStopBefore: false, undoStopAfter: false });
    }
    let twoBlocksSnippet = (firstBlock,secondBlock) =>{
        if(!isTextCorrectlySelected()){            
            return;
        }
        let line_start = vscode.window.activeTextEditor.selection.start.line;
        let char_numb_start = vscode.window.activeTextEditor.selection.start.character;
            // let line_end = vscode.window.activeTextEditor.selection.end.line;
            // let all_text = vscode.window.activeTextEditor.document.getText();
            let selection = vscode.window.activeTextEditor.selection;            
            let addLines = 0
            let if_snippet = new vscode.SnippetString(`${firstBlock}\r\n`);
            let firstLine = new vscode.Position(
                selection.start.line,
                selection.start.character);
            vscode.window.activeTextEditor.insertSnippet(if_snippet,firstLine,{ undoStopBefore: false, undoStopAfter: false });
            addLines++;
            let tabSnippet = new vscode.SnippetString("\t");
            for(let i = selection.start.line + 1;i<=selection.active.line +1 ;i++){
                let newline = new vscode.Position(
                    i,
                    selection.start.character);
                vscode.window.activeTextEditor.insertSnippet(tabSnippet,newline,{ undoStopBefore: false, undoStopAfter: false });
            }

            let close_if_snippet = new vscode.SnippetString(`${secondBlock}\r\n\t\r\n}`);
            // let close_all_snippet = new vscode.SnippetString("}");            
            let lastLine = new vscode.Position(
                selection.active.line +2 ,
                selection.start.character);
            vscode.window.activeTextEditor.insertSnippet(close_if_snippet,lastLine,{ undoStopBefore: false, undoStopAfter: false });
            let newCursorPosition = vscode.window.activeTextEditor.selection.active.with(line_start,char_numb_start + 13)
            var newSelection = new vscode.Selection(newCursorPosition, newCursorPosition);
            vscode.window.activeTextEditor.selection = newSelection;
    }
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let ifMe = vscode.commands.registerCommand('extension.ifMe', () => {
                
        if(!vscode.window.activeTextEditor.selection.isEmpty){
            twoBlocksSnippet("if(expression){","}else{")            
        }else{
            vscode.window.showInformationMessage('no text selected');
        }        

    });
    let tryCatchMe = vscode.commands.registerCommand('extension.tryCatchMe', () => {
        if(!vscode.window.activeTextEditor.selection.isEmpty){
            twoBlocksSnippet("try{","}catch(e){\r\n\tconsole.error(e);")            
        }else{
            vscode.window.showInformationMessage('no text selected');
        }
    });
    let stringifyMe = vscode.commands.registerCommand('extension.stringifyMe', () => {        
        if(!vscode.window.activeTextEditor.selection.isEmpty){
            surroundWithFunction("JSON.stringify");
        }else{
            vscode.window.showInformationMessage('no text selected');
        }
    }); 

    let parseMe = vscode.commands.registerCommand('extension.parseMe', () => {        
        if(!vscode.window.activeTextEditor.selection.isEmpty){
            surroundWithFunction("JSON.parse");
        }else{
            vscode.window.showInformationMessage('no text selected');
        }
    }); 
    
    context.subscriptions.push(ifMe);
    context.subscriptions.push(tryCatchMe);
    context.subscriptions.push(stringifyMe);
    context.subscriptions.push(parseMe);
}

// this method is called when your extension is deactivated
export function deactivate() {
}