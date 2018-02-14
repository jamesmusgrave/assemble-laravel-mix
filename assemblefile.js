'use strict';

var assemble = require('assemble');
var app = assemble();

var watch = require('base-watch');

var helpers = require('handlebars-helpers')();
var helperRepeat = require('handlebars-helper-repeat');

var glob = require("glob");

var images = glob.sync("build/images/*.jpg").map(function(file){
	return file.replace('build/','');
});

app.use(watch());

app.data({
	siteName: 'Example Site',
	images: images
});

app.task('build', function() {
	app.layouts('./resources/layouts/**.html');
	app.partials('./resources/partials/**.html');
	app.helpers(helpers);
	app.pages('resources/*.html');
	return app.toStream('pages')
	 .pipe(app.renderFile())
	 .pipe(app.dest('build'));
	});


app.task('watch', function() {
	app.watch( './resources/**.html', ['build']);
});

module.exports = app;
