# Erdblock


## Overview


-	Structure
-	API
	-	locals.title
	-	locals.config
	-	html()
	-	less()
	-	README-sandkasten.md
-	Example
-	Done/ Planned
-	Layout
	-	Text Size


## Structure

Each plugin provide its own HTML and LESS code by returning it in 2 functions. The function `module.exports` is used to init the plugin, and returns an instance of express. This is usefull, because every plugin can add its own relative url handlers to provide content, like images.

For more details look at the more complex plugins like `erdblock-github`.

## API

### locals.title

Title of the Plugin

### locals.config

The config object stores the main configuration of the plugin.

attribut | type | description - | - label | String | display the kind of config to the backend user value | Any | the raw value setValue | function(value) | change/ set the value type | String | usual HTML input field types + some additionals (`textarea`\) isValid | function(value) | can be used to validate the value bevore setting, returns null if valid

```javascript
app.locals.config = {
	valueA: {
		label: 'Value A',
		value: 'A',
		setValue: function(v){
			value = v
		},
		type: ['password', 'text', 'int', 'mail', 'date', 'dattime'],
		isValid: function(value){
			is.text(value){
				return null
			}
			else {
				return "errormsg"
			}
		},
	},
	valueB: {
		// ...
	}
}
```

### html()

This function returns the HTML content of the plugin. This is not a place for time expensive reqests, just render and return your HTML.

### less()

This function returns a less string, which will only affect the plugin content.

### README-sandkasten.md

Optional file which contains only description of the plugin.

## Example

Look at the `erdblock-default` plugin, which can be used to start crating a new plugin.

## Done/ Planned

List of currently working plugins:
- [erdblock-stackexchange](https://gitlab01.markab.uberspace.de/erdblock/erdblock-stackexchange)
- [erdblock-rss](https://gitlab01.markab.uberspace.de/erdblock/erdblock-rss)
- [erdblock-appStore](https://gitlab01.markab.uberspace.de/erdblock/erdblock-appStore)
- [erdblock-github](https://gitlab01.markab.uberspace.de/erdblock/erdblock-github)
- [erdblock-markdown](https://gitlab01.markab.uberspace.de/erdblock/erdblock-markdown)
- [erdblock-website](https://gitlab01.markab.uberspace.de/erdblock/erdblock-website)

Planned plugins: 
- Twitter
- Facebook
- LinkedIn
- YouTube
- Instagramm
- Dribble
- PlayStore
- Clock
- Timetable
- Events
- Calendar (CalDav)

## Layout

Every plugin should have a H1, which will be the main title for the plugin, and can also contain the main link. H2 is used to display a sub header, for example an account name.

-	H1
	-	(Link)
-	H2 (1em bottom margin)
-	Content

### Text Size

| Size    | Description        | Weight | Color  |
|---------|--------------------|--------|--------|
| `1em`   |  default text size |        |        |
| `1.2em` | h1                 | `400`  | `#000` |
|         | h2                 | `200`  | `#666` |
| `2em`   | midsize            |        |        |
| `4em`   | large              |        |        |
