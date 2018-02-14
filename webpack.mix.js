let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.js('resources/app.js', 'build/js')
.sass('resources/app.scss', 'build/css')
.version()
.setPublicPath('build')
.browserSync({
	files:[
	'./build/css/app.css', 
	'./build/js/app.js',
	'./build/*.html' 
	],
	proxy: false,
	server: {
		baseDir: './build/'
	}
})
.options({
	postCss: [
	require('postcss-clearfix')
	]
});