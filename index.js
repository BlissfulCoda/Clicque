(function() {
  const { app, BrowserWindow } = require('electron');


  let mainWindow;
  //Creating the Main window
  function createMainWindow() {
    mainWindow = new BrowserWindow({
      title: 'ImageShrink',
      width: 400,
      height: 500
    });

    mainWindow.loadURL('https://weareadaptive.com/')
  }

  app.on('ready', createMainWindow);
})();
