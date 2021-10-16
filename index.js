#!/usr/bin/env node
const child_process = require('child_process')
const fs = require('fs')
const fsExtra = require('fs-extra')
const path = require('path')

console.info('[INFO]: Webpack Template by ${Mr.DJA}!')
console.info('[INFO]: Current working directory: ' + path.resolve("./"))

if (process.argv[2] !== "--force") {
	let files
	try {
		files = fs.readdirSync('./')
	} catch (err) {
		console.warn('[WARN]: An error occurred while trying to check the directory!')
		console.error('[ERROR]: ', err)
		return
	}
	if (files && files.length) {
		console.warn('[WARN]: The directory isn\'t empty!')
		console.info('[INFO]: Make sure that you\'re running this command inside an empty directory then try again!')
		console.info('[INFO]: You can also pass \'--force\' as a parameter to the command to bypass the directory check. DO IT AT YOUR OWN RISK!')
		return
	}
} else {
	console.info('[INFO]: Forced to bypass the directory check.')
}

console.info('[INFO]: Copying the template files...')
try {
	fsExtra.copySync(`${__dirname}/template`, './')
} catch (err) {
	console.warn('[WARN]: An error occurred while trying to copy the files!')
	console.error('[ERROR]: ', err)
	return
}

console.info('[INFO]: Renaming \'.gitignore-template\' to \'.gitignore\'.')
try {
	fsExtra.renameSync('./.gitignore-template', './.gitignore')
} catch (err) {
	console.warn('[WARN]: An error occurred while trying to rename the file!')
	console.error('[ERROR]: ', err)
	return
}

console.info('[INFO]: Installing the project dependencies...')
try {
	child_process.execSync('npm i', {
		stdio: [0, 1, 2]
	})
} catch (err) {
	console.log(new Array(150).fill(' ').join(''))
	console.warn('[WARN]: An error occurred while trying to install the dependencies!')
	console.error('[ERROR]: ', err)
	console.info('[INFO]: Try running \'npm i\' manually.')
	return
}

console.log(new Array(150).fill(' ').join(''))
console.info('[INFO]: Success! Enjoy :)')
console.info('[INFO]: Execute \'npm run start\' to start the dev server and \'npm run build\' to build your project.')