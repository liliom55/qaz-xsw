The folder FitConnectModuleSrc inside app is a hard symlink. It means that it is just a link to the src folder in fitconnectmodule.

If you need to set the symlink manually:

open cmd prompt,
cd <path to FitConnectDevelopmentApp/src/app>
mklink /J FitConnectModuleSrc ..\..\..\FitConnectModule\src

then you can modify the module inside the app as if the module was part of the app