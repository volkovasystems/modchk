#!/usr/bin/env node

/*;
	@run-module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-run-module-license

	@run-module-configuration:
		{
			"package": "modchk",
			"path": "modchk/run.js",
			"file": "run.js",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/modchk.git",
			"shell": "modchk",
			"command": "verify",
			"parameter": [ "directory" ]
		}
	@end-run-module-configuration

	@run-module-documentation:
		Run module for the modchk module.
	@end-run-module-documentation

	@include:
		{
			"path": "path",
			"yargs": "yargs"
		}
	@end-include
*/

const path = require( "path" );
const yargs = require( "yargs" );

const modchk = require( path.resolve( __dirname, "modchk.js" ) );
const package = require( path.resolve( __dirname, "package.json" ) );

const parameter = yargs
	.epilogue(
		( package.homepage )
		? `For more information go to, ${ package.homepage }`
		: "Please read usage and examples carefully."
	)

	.usage( `Usage: ${ package.option.shell } verify <module>` )

	.command(
		"verify <module>",
		"Verify module if installed."
	)

	.example(
		"$0 verify my-module",
		"Verify my-module if installed."
	)

	.option( "global", {
		"default": false,
		"describe": "Verify on global repository",
		"type": "boolean"
	} )

	.option( "dir", {
		"alias": "directory"
		"default": process.cwd( ),
		"describe": "Use this directory as base where to check module.",
		"type": "string"
	} )

	.help( "help" )

	.version( function version( ){
		return package.version;
	} )

	.wrap( null )

	.strict( )

	.argv;

modchk( parameter.module, {
	"global": parameter.global,
	"directory": parameter.directory
} );
