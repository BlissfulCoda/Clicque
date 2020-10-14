(function() {
  const { app, BrowserWindow, Menu} = require('electron');

  //set Environment
  process.env.NODE_ENV = 'development';

  const isDev = process.env.NODE_ENV !== 'production' ? true : false;
  const isMac = process.platform === 'darwin' ? true : false;

  let mainWindow;
  let aboutWindow;
  //Creating the Main window
  function createMainWindow() {
    mainWindow = new BrowserWindow({
      title: 'Clique',
      width: 400,
      height: 500,
      resizable: isDev,
      backgroundColor: 'white'
    });

    mainWindow.loadFile('./app/index.html');
  }

  //About Window
  function createAboutWindow() {
    aboutWindow = new BrowserWindow({
      title: 'About Clique',
      width: 300,
      height: 300,
      resizable: false,
      backgroundColor: 'white'
    });

    aboutWindow.loadFile('./app/index.html');
  }

  app.on('ready', () => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
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
      role: 'FileMenu'
    },

    ...(isDev
      ? [
          {
            label: 'Developer',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              { type: 'seperator' },
              { role: 'toggledevtools' }
            ]
          }
        ]
      : [])
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
