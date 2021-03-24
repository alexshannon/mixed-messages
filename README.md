# Wacky DnD Character Generator v1
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project will randomly generate the base of a new DnD character based on some inputted parameters, such as Name, if you want the character to be serious or silly, and general role(ranged, caster, melee). In the current v1 state, input is very strict - you must match what appears in the terminal exactly - including casing - otherwise you'll get kicked out. v2 will have more robust error handling.

For the character, the v1 stat output does not include any stat bonuses other than the initial dice roll. This will come in v2.
	
## Technologies
Project is created with:
* console-read-write v 0.1.1
* npm version 6.14.11
* node version 14.16.0
	
## Setup
To run this project, use node:

```
$ cd ../wacky-dnd-character-generator
$ npm i --save console-read-write
$ node main.js
```
