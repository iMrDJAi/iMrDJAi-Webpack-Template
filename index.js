#!/usr/bin/env node
var fs = require('fs')
var fsExtra = require('fs-extra')
var path = require("path")
var npm = require('npm')
console.info('[INFO]: Webpack Template By ${Mr.DJA}!')
console.info('[INFO]: Current Working Directory: ' + path.resolve("./"))
fs.readdir('./', (e, files) => {
	if (e && process.argv[2] !== "--force") {
		console.warn('[WARN]: An Error Occurred While Trying To Check The Directory!')
		console.error('[ERROR]: ', e)
	} else {
		if (process.argv[2] === "--force") {
			console.info('[INFO]: Forcing To Bypass The Directory Check.')
			var DirTest = true
		} else var DirTest = files && files.length === 0
		if (DirTest) {
			console.info('[INFO]: Copying The Template Files...')
			fsExtra.copy(__dirname + '/template', './', er => {
				if (er) {
					console.warn('[WARN]: An Error Occurred While Trying To Copy The Files!')
					console.error('[ERROR]: ', er)
				} else {
					console.info('[INFO]: Renaming \'.gitignore-template\' To \'.gitignore\'.')
					fs.rename('./.gitignore-template', './.gitignore', err => {
						if (err) {
							console.warn('[WARN]: An Error Occurred While Trying To Rename The File!')
							console.error('[ERROR]: ', err)
						} else {
							console.info('[INFO]: Installing The Project Dependencies...')
							npm.load(errr => {
								if (errr) {
									console.warn('[WARN]: An Error Occurred While Trying To Load NPM!')
									console.error('[ERROR]: ', errr)
									console.info('[INFO]: Try To Run \'npm i\' Manually.')
								} else {
									npm.on('log', message => console.log(message))
									npm.commands.install(errrr => {
										if (errrr) {
											console.log('                                                                                                                                                      ')
											console.warn('[WARN]: An Error Occurred While Trying To Install The Dependencies!')
											console.error('[ERROR]: ', errrr)
											console.info('[INFO]: Try To Run \'npm i\' Manually.')
										} else {
											console.log('                                                                                                                                                      ')
											console.info('[INFO]: Success! Enjoy :)')
											console.info('[INFO]: Execute \'npm run start\' To Start The Dev Server, And \'npm run build\' To Build Your Project.')
		
										}
									})
								}
							})
						}
					})				   
				}
			})
		} else {
			console.warn('[WARN]: The Directory Isn\'t Empty!')
			console.info('[INFO]: Make Sure That You\'re Running This Command Inside An Empty Directory Then Try Again!')
			console.info('[INFO]: You Can Also Pass \'--force\' As A Parameter To The Command To Bypass That Check. DO IT AT YOUR OWN RISK!')
		}
	}
})