/* @flow */

var express = require("express")
var is = require("is")
var less = require("less")
var expressLess = require('express-less')
var compression = require('compression')
var uuid = require("uuid")
var jade = require("jade")

module.exports = function(){
	var app = express()
	app.set('view engine', 'jade');

	/**
		Main Object to store all plugins
	*/
	app.locals.pluginData = {}

	/**
		Sorted array with {id: ?, priority: ?} objects
	*/
	app.locals.priorityCache = []





	// Set up express

	app.use(compression())

	app.use("/stylesheets", function(req, res, next){
	   res.set("Cache-Control", "public, max-age=604800")
	   next()
	})

	app.get("/assets/cover.png", function (req, res) {
		res.sendFile(app.locals.coverImage)
	})
	app.get("/assets/profile.png", function (req, res) {
		res.sendFile(app.locals.profileImage)
	})

	app.get("/stylesheets/plugins.css", function(req, res){
		var css = ""
		app.locals.priorityCache.forEach(function(cache){
			var plugin = app.locals.pluginData[cache.key].plugin
			css += " #" + plugin.locals.uuid + " { " + plugin.less() + " } "
		})
		less.render( css, function( e, r ){
			res.type("text/css")
			res.send(r.css)
		})
	})
	app.use("/stylesheets", expressLess(__dirname + "/stylesheets"))

	app.get("/", function(req, res){
		res.render(__dirname+"/views/layout")
	})



	/**
		Helper function to refresh the priorityCache
	*/
	function sortData(){
		app.locals.priorityCache = []
		for (var key in app.locals.pluginData) {
			app.locals.priorityCache.push( {key: key, priority: app.locals.pluginData[key].priority} )
		}
		app.locals.priorityCache.sort(function (a, b) {
			if (a.priority < b.priority) {
				return 1;
			}
			if (a.priority > b.priority) {
				return -1;
			}
			return 0;
		})
	}




	/**
		Add plugin to erdblock

		@param plugin
		@param id to identify the plugin for later manipulation
		@param priority (optional)
	*/
	app.addPlugin = function(p, id, priority){
		//id = typeof id !== 'undefined' ? id : app.locals.pluginData.length;
		priority = typeof priority !== 'undefined' ? priority : 100;

		// The uuid is used as a css selector so its first character needs to match [a-zA-Z].
		p.locals.uuid = "p" + uuid.v4().replace(/[^a-zA-Z0-9]/g, '')
		app.locals.pluginData[id] = { priority: priority, plugin: p }
		sortData()
		app.use("/plugin/" + p.locals.uuid, p)
	}


	/**
		Remove plugin from erdblock

		@param id (optional) to identify the plugin for later manipulation
	*/
	app.removePlugin = function(id){
		delete app.locals.pluginData[id]
		sortData()
	}


	/**
		Set the priority for a plugin

		@param id (optional) to identify the plugin for later manipulation
		@param priority (optional)
	*/
	app.setPriorityForPlugin = function(id, priority){
		if (app.locals.pluginData[id]) {
			app.locals.pluginData[id].priority = priority
			sortData()
		}
	}

	return app
}
