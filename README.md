## Flux Chat Example

This is an example application we've created to show an example of how a Flux
app is structured, and how you might use waitFor to make sure the Stores'
registered callbacks are called in the correct order.

    <div>
      <div id="notes-button-bar"></div>
      <textarea id="notes" name="copy"></textarea>
      <div id="notes-preview"></div>
      <input type="text" name="copy_html" value="" id="copy_html"/>
    </div>
## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

`npm install`

This will install all dependencies.

To build the project, first run this command:

`npm start`

This will perform an initial build and start a watcher process that will
update build.js with any changes you wish to make.  This watcher is
based on [Browserify](http://browserify.org/) and
[Watchify](https://github.com/substack/watchify), and it transforms
React's JSX syntax into standard JavaScript with
[Reactify](https://github.com/andreypopp/reactify).

After starting the watcher, you can open `index.html` in your browser to
open the app.

