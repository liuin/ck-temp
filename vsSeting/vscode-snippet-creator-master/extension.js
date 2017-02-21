var vscode = require('vscode');
var process = require('process');
var fs = require('fs');
var util = require('util');
var os = require('os');


var singleComment = 1;
var multiComment = 2;

function stripWithoutWhitespace() {
  return '';
}

function stripWithWhitespace(str, start, end) {
  return str.slice(start, end).replace(/\S/g, ' ');
}

function stripJSONComments(str, opts) {
  opts = opts || {};

  var currentChar;
  var nextChar;
  var insideString = false;
  var insideComment = false;
  var offset = 0;
  var ret = '';
  var strip = opts.whitespace === false ? stripWithoutWhitespace : stripWithWhitespace;

  for (var i = 0; i < str.length; i++) {
    currentChar = str[i];
    nextChar = str[i + 1];

    if (!insideComment && currentChar === '"') {
      var escaped = str[i - 1] === '\\' && str[i - 2] !== '\\';
      if (!escaped) {
        insideString = !insideString;
      }
    }

    if (insideString) {
      continue;
    }

    if (!insideComment && currentChar + nextChar === '//') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = singleComment;
      i++;
    } else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
      continue;
    } else if (insideComment === singleComment && currentChar === '\n') {
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
    } else if (!insideComment && currentChar + nextChar === '/*') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = multiComment;
      i++;
      continue;
    } else if (insideComment === multiComment && currentChar + nextChar === '*/') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i + 1);
      offset = i + 1;
      continue;
    }
  }

  return ret + (insideComment ? strip(str.substr(offset)) : str.substr(offset));
};

console.log('fdff');

function activate(context) {


  var vsCodeUserSettingsPath;
  const osName = os.type();
  var delimiter = "/";
  switch (osName) {
    case ("Darwin"):
      {
        vsCodeUserSettingsPath = process.env.HOME + "/Library/Application Support/Code/User/";
        break;
      }
    case ("Linux"):
      {
        vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/";
        break;
      }
    case ("Windows_NT"):
      {
        vsCodeUserSettingsPath = process.env.APPDATA + "\\Code\\User\\";
        delimiter = "\\";
        break;
      }
    default:
      {
        //BSD?
        vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/";
        break;
      }
  }

  let path = vsCodeUserSettingsPath + '/liuin-snippets/';
  var file = path + 'jquery.js';



  //读取文件列表
  fs.readdir(path, function(err, files) {
    if (err) {
      console.log(err);
      return;
    }

    var results = {};
    var arr = [];
    var count = 0;
    files.forEach(function(filename) {

      let file1 = fs.readFile(path + filename, function(data) {
        // if (filename.lastIndexOf('.') > -1) {
        // filenameSub = filename.substr(0, filename.lastIndexOf('.'));          
        // }else{
        //   filenameSub = filename;
        // }
        let filenameSub = filename;

        let item = new vscode.CompletionItem(filenameSub, 0);

        vscode.workspace.openTextDocument(path + filename).then(function(data) {
          var text1 = data.getText();
          text1 = text1.replace(/(\\)/g, '$1$1');
          item.insertText = text1;
          count++;
          if (count >= files.length) {
            var provlist = new vscode.CompletionList(arr);
            vscode.languages.registerCompletionItemProvider('css', {
              provideCompletionItems(docment, postion, token) {
                return provlist;
              }
            });
            vscode.languages.registerCompletionItemProvider('html', {
              provideCompletionItems(docment, postion, token) {
                return provlist;
              }
            });
            vscode.languages.registerCompletionItemProvider('phtml', {
              provideCompletionItems(docment, postion, token) {
                return provlist;
              }
            });
            vscode.languages.registerCompletionItemProvider('php', {
              provideCompletionItems(docment, postion, token) {
                return provlist;
              }
            });
            vscode.languages.registerCompletionItemProvider('javascript', {
              provideCompletionItems(docment, postion, token) {
                return provlist;
              }
            });
          }
        });
        arr.push(item);
      })
    });
  })

  //addfile
  // vscode.window.showQuickPick(['1', '2', '3'], { placeHolder: "选择你的号码" })

  var disposableFile = vscode.commands.registerCommand('extension.createSnippetFile', function() {
    var editor = vscode.window.activeTextEditor;
    var selection = editor.selection;
    var selectedText = editor.document.getText(selection);

    if (selection.isEmpty) {
      vscode.window.showWarningMessage("请先选择一段文字(file)");
      return;
    }



    vscode.window.showInputBox({
      prompt: "输入你的文件名"
    }).then((name) => {
      fs.writeFile(path + name, selectedText, function(data) {
        return vscode.window.showInformationMessage('写入成功');
      })
    })
  })


  //删除文件
  var FileDele = vscode.commands.registerCommand('extension.SnippetFileDelet', function() {
    fs.readdir(path, function(err, files) {
      if (err) {
        console.log(err);
        return;
      }

      vscode.window.showQuickPick(
        files, {
          placeHolder: "选择要删除的文件"
        }
      ).then((filename) => {
        console.log(arguments);
        vscode.window.showInformationMessage('确定要删除吗?', '确定').then(function(data) {
          if (data == "确定") {
            fs.unlink(path + filename, function(err) {
              if (err) {
                vscode.window.showErrorMessage('删除失败');
              } else {
                vscode.window.showInformationMessage('删除成功');
              }
            });
          }
        });

      })
    })
  })



  var disposable = vscode.commands.registerCommand('extension.createSnippet', function() {

    var editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("请先选择一段文字(snippet)");
      return;
    }

    var selection = editor.selection;
    if (selection.isEmpty) {
      vscode.window.showWarningMessage("请先选择一段文字(snippet)");
      return;
    }
    var selectedText = editor.document.getText(selection);

    let snippetObject = {};
    vscode.languages.getLanguages()
      .then((vsCodeLangs) => {
        return vscode.window.showQuickPick(
          vsCodeLangs, {
            placeHolder: vscode.window.activeTextEditor.document.languageId
          })
      }).then(language => {
        snippetObject.language = language;
        return vscode.window.showInputBox({
          prompt: "Enter snippet name"
        })
      }).then((name) => {
        if (name === undefined) {
          return;
        }
        snippetObject.name = name;
        return vscode.window.showInputBox({
          prompt: "Enter snippet shortcut"
        })
      }).then((shortcut) => {
        if (shortcut === undefined)
          return;
        snippetObject.shortcut = shortcut;
        return vscode.window.showInputBox({
          prompt: "Enter snippet description"
        })
      }).then((description) => {
        if (description === undefined)
          return;
        snippetObject.description = description;
      }).then(() => {
        var vsCodeUserSettingsPath;
        const osName = os.type();
        var delimiter = "/";
        switch (osName) {
          case ("Darwin"):
            {
              vsCodeUserSettingsPath = process.env.HOME + "/Library/Application Support/Code/User/";
              break;
            }
          case ("Linux"):
            {
              vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/";
              break;
            }
          case ("Windows_NT"):
            {
              vsCodeUserSettingsPath = process.env.APPDATA + "\\Code\\User\\";
              delimiter = "\\";
              break;
            }
          default:
            {
              //BSD?
              vsCodeUserSettingsPath = process.env.HOME + "/.config/Code/User/";
              break;
            }
        }

        var userSnippetsFile = vsCodeUserSettingsPath + util.format("snippets%s.json", delimiter + snippetObject.language);

        fs.readFile(userSnippetsFile, (err, text) => {
          if (err) {
            fs.open(userSnippetsFile, "w+", (err, fd) => {
              if (err)
                return;
              else {
                var snippets = {}
                snippets[snippetObject.name] = {
                  prefix: snippetObject.shortcut,
                  body: buildBodyFromText(selectedText),
                  description: snippetObject.description
                }
                var newText = JSON.stringify(snippets, null, '\t');
                fs.writeFile(userSnippetsFile, newText, (err => {

                }))
              }
            })
          } else {
            var snippets = jsonFromText(text.toString());

            if (snippets[snippetObject.name] !== undefined) {
              // vscode.window.showErrorMessage("Snippet with this name already exists");
              return;
            } else {
              snippets[snippetObject.name] = {
                prefix: snippetObject.shortcut,
                body: buildBodyFromText(selectedText),
                description: snippetObject.description
              }
              var newText = JSON.stringify(snippets, null, '\t');
              fs.writeFile(userSnippetsFile, newText, (err => {

              }))
            }
          }
        });
      });

  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableFile);
  context.subscriptions.push(FileDele);
}
exports.activate = activate;

function buildBodyFromText(text) {
  var text = text.replace(/\\/g, '\\\\');
  var fixed = text.replace(/\t/g, '\\t');
  return fixed.split("\n");
}

function jsonFromText(text) {
  var regexp = /"(\\.|[^"\\])*"/ig;
  var result;

  text = stripJSONComments(text, {
    whitespace: false
  });
  var out = text;
  while (result = regexp.exec(text)) {
    var substr = text.slice(result.index, regexp.lastIndex);
    var fixed = substr.replace(/\t/g, '\\t')
    out = out.substring(0, result.index) + fixed + text.substring(regexp.lastIndex);
  }

  return JSON.parse(out);
}

function deactivate() {}
exports.deactivate = deactivate;