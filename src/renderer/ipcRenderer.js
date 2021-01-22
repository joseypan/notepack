/**
* @Description: 渲染进程js逻辑
* @author PanXumin
* @date 2021-01-21 
*/
const { ipcRenderer, remote } = require('electron')
const fs = require('fs')
const textAreaDom = document.getElementById('text-area')
let isSave = false
let currentFilePath = ''
let docTitle = '未命名'
/**
* 描述：监听鼠标右键事件
* @param { Object } e 事件对象e
*/
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    ipcRenderer.send('contextMenu')
})
/**
* 描述：监听主线程传输的action事件
* @param { Object } e 事件对象 data 传输过来的数据 
*/
ipcRenderer.on('action', (e, data) => {
    switch (data) {
        case "open":
            remote.dialog.showOpenDialog(remote.BrowserWindow.getFocusedWindow(), {
                properties: ['openFile']
            }).then(data => {
                if (!data.cancel) {
                    let filePath = data.filePaths[0]
                    fs.readFile(filePath, (err, text) => {
                        textAreaDom.value = text
                    })
                }
            })
            break;
        case "save":
            // 判断是否已经保存过
            if (!isSave) {
                remote.dialog.showSaveDialog(remote.BrowserWindow.getFocusedWindow(), {
                    defaultPath: 'aaa.txt',
                    filters: [
                        {
                            name: 'All Files', extensions: ['*']
                        }
                    ]
                }).then(data => {
                    if (!data.cancel) {
                        currentFilePath = data.filePath
                        let contentText = textAreaDom.value
                        fs.writeFile(currentFilePath, contentText, err => {
                            console.log(err)
                        })
                    }
                })
            } else {
                // 保存过找到之前的地址直接保存即可
                let contentText = textAreaDom.value
                fs.writeFile(currentFilePath, contentText, err => {
                    console.log(err)
                })
            }
            isSave = true;
            break;
        case "new":
            // 提示是否保存
            if(isSave){
                textAreaDom.value = ""
                return
            }
            let res = remote.dialog.showMessageBox(remote.BrowserWindow.getFocusedWindow(),{
                type: 'question',
                message:'是否保存',
                title: '提示',
                // buttons:['确认','取消'],
            })
            console.log(res)
            break;
        case "quit":
            ipcRenderer.send('quit')
    }
})
/**
* 描述：监听textarea改动
* @param {} 
* @return 
*/
textAreaDom.oninput = () => {
    isSave = false
    docTitle += '*'
}