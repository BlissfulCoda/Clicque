const {app, BrowserWindow} = require('electron')

//Main window
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'ImageShrink',
        width: 400,
        height: 500
    })
}

app.on('ready', createMainWindow);