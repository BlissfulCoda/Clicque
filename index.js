(function() {
  const { app, BrowserWindow } = require('electron');

  //set Environment
  process.env.NODE_ENV = 'development'


  const isDev = process.env.NODE_ENV !== 'production' ? true : false
  const isMac = process.platform === 'darwin' ? true : false

  let mainWindow;
  //Creating the Main window
  function createMainWindow() {
    mainWindow = new BrowserWindow({
      title: 'Clique',
      width: 400,
      height: 500,
      resizable: isDev
    });

    mainWindow.loadFile('./app/index.html')
  }

  app.on('ready', createMainWindow);
  app.on('window-all-closed', () => {
      if(!isMac){
          app.quit();
      }
  })

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
})





})();
