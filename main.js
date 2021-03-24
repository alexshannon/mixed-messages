const input = require('console-read-write');
let newCharacter;

async function main() {
  //all this is for pulling intital user preferences for their generated character
  input.write('Hello! Welcome to Wacky DnD character Generator!');
  input.write('What would you like to name your character?');
  //creates and sets character name to new constant from user input
  const characterName = await input.read();
  input.write('Would you like to be ranged, melee, or a caster?')
  //creates and sets character role to new constant from user input
  const characterRole = await input.read();
  //creates and sets character mood to new constant from user input
  input.write('Do you want your character serious or silly?')
  const seriousOrSilly = await input.read();

  //validates for valid input - need to build out correct exits for invalid inputs
  if(seriousOrSilly === 'serious' || seriousOrSilly === 'silly'){
    if(characterRole === 'ranged' || characterRole === 'melee' || characterRole === 'caster'){
        console.log(`Thanks! Making ${characterName} now...`)
        newCharacter = charGen(characterName, characterRole, generateType(characterRole), seriousOrSilly, generateStats(characterRole), generateQuirk(seriousOrSilly, characterName, characterRole), generateRace())
        console.log(newCharacter)
      } else{
          input.write('Oh no! You entered an invalid role. Exiting.')
      }
  } else {
      input.write('Oh no! You entered an invalid serious-ness value. Exiting.')
  }
  
}

main();

//outputs the info of the character that's created by the program #todo - save to a local file
const charGen = (name, role, type, mood, stats, quirk, race) => {
    return{
    Character_Name: name,
    Character_Role: role,
    Character_Class: type,
    Character_Mood: mood,
    Character_Stats: stats,
    Character_Quirk: quirk,
    Character_Race: race,
    } 
}

//this isn't called by itself - this is used in stat declaration
function statRoll(){
    //follows dnd rules - gens 4 random d6, drops the lowest value
    //vanilla sort works here due to no double digits
    let roll = []
    for(let i = 0; i < 4; i++)
    {    
        roll.push((Math.floor(Math.random() * 6) + 1))
    }
    //sorts low to high, drops lowest, and returns the stat role
    roll.sort()
    roll.shift()
    return roll[0] + roll[1] + roll[2]
}


function generateType(role){
    const casterArray = ['Wizard', 'Warlock', 'Sorcerer', 'Druid'];
    const meleeArray = ['Barbarian', 'Cleric', 'Fighter', 'Monk', 'Paladin', 'Rogue'];
    const rangedArray = ['Bard', 'Ranger'];
    //Randomly selects the class of the character based on role
    let classRole = 0;
    if(role === 'caster'){
       classRole = Math.floor(Math.random()*casterArray.length)
       return casterArray[classRole]
    }
    else if(role === 'melee'){
        classRole = Math.floor(Math.random()*meleeArray.length)
        return meleeArray[classRole]
     }
     else if(role === 'ranged'){
        classRole = Math.floor(Math.random()*rangedArray.length)
        return rangedArray[classRole]
     }

}

function generateStats(charRole){
    //declares the various arrays used. statArray/attributeArray only hold the data; finalArray is the output
    const statArray = [];
    const attributeArray = [];
    const finalArray = [];
    //populates the array with the 6 stat rolls
    do{
    statArray.push(statRoll())
    } while(statArray.length < 6)
    //sorts the rolls high to low
    statArray.sort((a, b) => b - a);

    //determines ordering of the stats based on the role
    if(charRole === 'melee'){
        attributeArray.push('Str', 'Con', 'Dex', 'Cha', 'Int', 'Wis')
    } else if(charRole === 'ranged'){
        attributeArray.push('Dex', 'Cha', 'Str', 'Con', 'Int', 'Wis')
    } else if(charRole === 'caster'){
        attributeArray.push('Wis', 'Int', 'Cha', 'Dex', 'Str', 'Con')
    }
    //sorts the array to a new element in finalArray
    for(let i = 0; i< attributeArray.length; i++){
        finalArray.push(`${attributeArray[i]}: ${statArray[i]}`)
    }
    return finalArray
}

function generateQuirk(charMood, charName, charRole){
    //scoped a bit higher, but this was a way to do this with the least number of variables
    let action = 0;
    let verb = 0;
    let object = 0;
    //the actual array that will be returned
    let charQuirk = '';
    //all of our super serial generation stuff
    const seriousAction = ['has sworn', 'has given an oath', ]
    const seriousVerb = ['to revenge', 'to defend']
    const seriousObject = ['his brother']
    //for the silly ones among us
    const sillyAction = ['is obsessed with', 'is afraid of']
    const sillyVerb = ['stealing', 'giving everyone', 'eating']
    const sillyObject = ['left socks', 'salad forks', 'the good china', 'half-eaten meals', 'turkey']
    //determines what serious/silly quirk the character has - needed to have seperate determinations due to the arrays not having the same length
    if(charMood === 'serious'){
        action = Math.floor(Math.random()*seriousAction.length)
        verb = Math.floor(Math.random()*seriousVerb.length)
        object = Math.floor(Math.random()*seriousObject.length)
        
        charQuirk = `${charName} the ${charRole} ${seriousAction[action]} ${seriousVerb[verb]} ${seriousObject[object]}`
    } else if(charMood === 'silly'){
        action = Math.floor(Math.random()*sillyAction.length)
        verb = Math.floor(Math.random()*sillyVerb.length)
        object = Math.floor(Math.random()*sillyObject.length)
        
        charQuirk = `${charName} ${sillyAction[action]} ${sillyVerb[verb]} ${sillyObject[object]}`
    }
    return charQuirk;
}

//determines the race of the character. #todo - adjust stats based on the race of the character
function generateRace(){
    const raceArray = ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling']
    const r = Math.floor(Math.random()*raceArray.length);
    return raceArray[r]
}