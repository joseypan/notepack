/**
* @Description: 项目主线程js逻辑
* @author PanXumin
* @date 2021-01-21
*/
const { BrowserWindow,Menu, shell, ipcMain } = require('electron')
// 上部菜单
const template = [
    {
        label: '文件',
        submenu: [
            {
              label: '新建',
              click: () => {
                  console.log('新建')
              }  
            },
            {
                label: '打开',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'open')
                }
            },
            {
                label: '保存',
                click: () => {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save')
                }
            },
            {
                type: 'separator'
            },
            {
                label: '打印',
                click: () => {
                    console.log('打印')
                }
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                role: 'undo'
            },
            {
                label: '恢复',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                role: 'cut'
            },
            {
                label: '复制',
                role:'copy'
            },
            {
                label: '粘贴',
                role: 'paste'
            },
            {   
                label: '保存格式粘贴',
                role: 'pasteAndMatchStyle' 
            }
        ]
    },
    {
        label: '视图',
        submenu: [
            {
                label: '重新加载',
                role: 'reload'
            },
            {
                label: '缩小',
                role: 'zoomin'
            },
            {
                label: '放大',
                role: 'zoomout'
            },
            {
                label: '重置缩放',
                role: 'resetzoom'
            },
            {
                type: 'separator'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click: () => {
                    shell.openExternal('http://www.baidu.com')
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// 右键菜单
const contextTemplate = [
    {
        label: '撤销',
        role: 'undo'
    },
    {
        label: '恢复',
        role: 'redo'
    },
    {
        type: 'separator'
    },
    {
        label: '剪切',
        role: 'cut'
    },
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '粘贴',
        role: 'paste'
    },
    {
        type: 'separator'
    },
    {
        label: '全选',
        role: 'selectall'
    }
]
const contextMenu = Menu.buildFromTemplate(contextTemplate)
ipcMain.on('contextMenu', () => {
    contextMenu.popup(BrowserWindow.getFocusedWindow())
})
