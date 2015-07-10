# Erdblock


## Overview


Erdblock is a modular personal webpage. The content is presented by different plugins, which return their own express instance.

-	API
	-	addPlugin(plugin, id, priority)
	-	removePlugin(id)
	-	setPriorityForPlugin(id, priority)
	-	locals.title
	-	locals.subtitle
	-	locals.profileImage
	-	locals.coverImage
-	Example
-	Licence

## API


### addPlugin(plugin, id, priority)

You can add plugins to an erdblock instance with the `addPlugin(plugin)` method.

attrubute | description - | - plugin | plugin object id | to identify the plugin for later manipulation priority | to oder the plugins (higher = first) | (optional)

```javascript
// init object
var plugin = require("erdblock-default")()

// add plugin to erdblock
erdblock.addPlugin(plugin, "p1")

// or with priority
erdblock.addPlugin(plugin, "p1", 900)
```

### removePlugin(id)

Remove plugin from erdblock.

attrubute | description - | - id | identifyer of the plugin

```javascript
// remove plugin from erdblock
erdblock.removePlugin("p1")
```

### setPriorityForPlugin(id, priority)

Set the priority for a added plugin.

attrubute | description - | - id | identifyer of the plugin priority | to oder the plugins (higher = first) |

```javascript
// set priority for plugin
erdblock.setPriorityForPlugin("p1", 1000)
```

### locals.title

Title of erdblock (H1)

### locals.subtitle

Subtitle of erdblock (H2)

### locals.profileImage

Absolute url to the profile image (round)

### locals.coverImage

Absolute url to the cover image

## Example


```javascript
// init erdblock object
var erdblock                        = require("erdblock")()

// init express object
var express                         = require("express")
var app = express()

// setup url handler for erdblock
app.use("/", erdblock)

// configure main settings
erdblock.locals.title               = "Hello World"
erdblock.locals.subtitle            = "Subtitle"
erdblock.locals.profileImage        = __dirname + "/assets/profile.png"
erdblock.locals.coverImage          = __dirname + "/assets/cover.png"

// configure the plugins, and add them to the erdblock object
var website                         = require("erdblock-website")()
website.locals.config.title         = "Example"
website.locals.config.url           = "http://www.example.com/"
website.locals.config.description   = "Example Description"
erdblock.addPlugin(website)

// configure additional plugins

// configure port
app.listen(3000)
```

Look at the [erdblock-default](https://github.com/erdblock/erdblock-default) for more examples.


## Licence


GNU GENERAL PUBLIC LICENSE Version 2
