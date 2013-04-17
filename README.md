# STARTER PROJECT
Fake website created for GDG Workshop : HTML5 / CSS3 for Responsive Web Design.
Workshop is in slides directory. Have fun !

# REQUIREMENT
- nodejs
- grunt
- compass
- ruby

# HELP
- grunt : check js and compile scss
- grunt compass : compile scss
- grunt cssmin : minified index.css and save it to temp/styles directory
- grunt watch : start watching js/css modification (if modified then do compass)
- compass run : compile css then start watching 
- grunt server : run local server, compile css then start watching

## ARCHITECTURE
- app/
- +__ img/
- +__ scripts/
- |  +__ libs/ (contains plugins)
- |	|__ config.js (for require.js)
- |	|__ main.js (for main script loader)
- +__ styles/
- |	+__ lib/ (contains plugins stylesheets)
- |	|__ _common.scss (your project stylesheet)
- |	|__ _cssreset.scss (YUI reset)
- |	|__ _font.scss (font set)
- |	|__ _h5bp.scss (boilerplate css framework)
- |	|__ index.css (compiled css w/ compass)
- |	|__ index.scss (css loader, may contain path of all css)
- |__ .htaccess
- |__ 404.html
- |__ favicon.ico
- |__ index.html
- |__ robots.txt
- temp/
- +__ styles/
- 	|__ index.css (minified version)


## GRUNT SETUP
- npm uninstall -g grunt
- npm install grunt-cli -g --save-dev
- npm install grunt --save-dev
- npm install grunt-contrib-compass --save-dev
- npm install grunt-contrib-watch --save-dev
- npm install grunt-contrib-mincss --save-dev
- npm install grunt-contrib-jshint --save-dev