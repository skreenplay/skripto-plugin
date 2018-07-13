skripto-plugin
=====

Use this tool to build plugins for [skripto](https://github.com/skreenplay/skripto)'s desktop app.

##  Install

```
npm i --save skripto-plugin
```

##  Plugin Structure

```  
|-- yourplugin/
    |-- package.json
    |-- src/
        |-- main.js
        |-- ...
        |-- manifest.json
```

In order to produce a usable plugin, it is crucial to bundle it with the `skripto-plugin` tool. It takes the `src/` folder and builds it in the `plugin/` folder.

To enable it, add the following script to your package.json

__package.json__

```
{
  "name":"skripto-plugin-yourplugin",
  "version":"0.0.1",
  "scripts":{
    "build":"skripto-plugin build src/ plugin/"
  },
  "dependencies": {
    "skripto-plugin":"0.0.2"
  }
}
```

## Build the plugin (in `src/`)

__manifest.json__

```
{
  "name":"Your plugin's name",
  "version":"0.0.1",
  "copyright":"Copyright © 2018 John Doe ",
  "type":"option",
  "where":[
    "Toolbar"
  ],
  "config":{
    "Toolbar":{
      "openPanel":true
    }
  }
}
```

__main.js__

```
export class Main extends Component {
  constructor(props) {
    super(props);
    // Default Props :
    // - skripto (ability to change file's data)
    // - settings (ability to change user settings)
  }
  render() {
    return (
      <div>
        //image
        image
      </div>
    )
  }
}
export class ToolbarMenu extends Component {
  constructor(props) {
    super(props);
    // Default Props :
    // - skripto (ability to change file's data)
    // - settings (ability to change user settings)
  }
  render() {
    return (
      <div>
        o
      </div>
    )
  }
}

```

Note that plugins are run in a sandbox, meaning that you can't require node modules, all javascript code must be

For this reason, React and Component (from React) are already defined and don't need to be imported. In fact, importing them will result in an error.
