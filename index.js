(function() {
  const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

  //set Environment
  process.env.NODE_ENV = 'development';

  const isDev = process.env.NODE_ENV !== 'production' ? true : false;
  const isMac = process.platform === 'darwin' ? true : false;

  let mainWindow;
  //Creating the Main window
  function createMainWindow() {
    mainWindow = new BrowserWindow({
      title: 'Clique',
      width: 400,
      height: 500,
      resizable: isDev,
      backgroundColor: 'white',
    });

    mainWindow.loadFile('./app/index.html');
  }

  app.on('ready', () => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())


    mainWindow.on('ready', () => (mainWindow = null));
  });

  const menu = [
    ...(isMac
      ? [
          {
            role: 'appMenu'
          }
        ]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+W',
          click: () => app.quit()
        }
      ]
    }
  ];

  app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
})();
