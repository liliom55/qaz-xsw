You cannot run the module by itself, it needs to be imported inside an angular 4 app.
That is why i added a angular4 app in fitconnectDevelopmentApp.

If you modify anything in the fitconnect, it needs to be recompile using npm run build. 
afterward you can run ng serve on fitconnectDevelopmentApp to see your changes.