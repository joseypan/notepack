/**
* @Description: 渲染进程js逻辑
* @author PanXumin
* @date 2021-01-21 
*/
const { ipcRenderer, remote } = require('electron')
const fs = require('fs')
const textAreaDom = document.getElementById('text-area')
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
            remote.dialog.showSaveDialog(remote.BrowserWindow.getFocusedWindow(), {
                defaultPath: 'aaa.txt',
                filters: [
                    {
                        name: 'All Files', extensions: ['*']
                    }
                ]
            }).then(data => {
                if (!data.cancel) {
                    let filePath = data.filePath
                    let contentText = textAreaDom.value
                    fs.writeFile(filePath, contentText, err => {
                        console.log(err)
                    })
                }
            })
            break;
    }
})