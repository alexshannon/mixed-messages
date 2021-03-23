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
        newCharacter = charGen(characterName, characterRole, seriousOrSilly)
        generateStats()
      } else{
          input.write('Oh no! You entered an invalid role. Exiting.')
      }
  } else {
      input.write('Oh no! You entered an invalid serious-ness value. Exiting.')
  }
  
}

main();

const charGen = (name, role, mood) => {
    return{
    Character_Name: name,
    Character_Roll: role,
    Character_Mood: mood,
    Character_Stats: [],
    Character_Quirk: '',
    set stats(chrStat){
        this.Character_Stats.push(chrStat)
    },
    set quirk(charQuirk){
        this.Character_Quirk = charQuirk
    }
    }
}

function statRoll(){
    //follows dnd rules - gens 4 random d6, drops the lowest value
    //vanilla sort works here due to no double digits
    let roll = []
    for(let i = 0; i < 4; i++)
    {    
        roll.push((Math.floor(Math.random() * 6) + 1))
    }
    roll.sort()
    roll.shift()
    return roll[0] + roll[1] + roll[2]
}

function generateStats(){
    //declares the various arrays used. statArray/attributeArray only hold the data; finalArray is the output
    const statArray = [];
    const attributeArray = [];
    let finalArray = [];
    do{
    statArray.push(statRoll())
    } while(statArray.length < 6)
    statArray.sort((a, b) => b - a);
    console.log(newCharacter.Character_Roll)

    if(newCharacter.Character_Roll === 'melee'){
        attributeArray.push('Str', 'Con', 'Dex', 'Cha', 'Int', 'Wis')
    } else if(newCharacter.Character_Roll === 'ranged'){
        attributeArray.push('Dex', 'Cha', 'Str', 'Con', 'Int', 'Wis')
    } else if(newCharacter.Character_Roll === 'caster'){
        attributeArray.push('Wis', 'Int', 'Cha', 'Dex', 'Str', 'Con')
    }
    for(let i = 0; i< attributeArray.length; i++){
        finalArray[i] = attributeArray[i] + statArray[i]
    }
    console.log(finalArray)
    newCharacter.stats = finalArray
}

function generateQuirk(){
    if(newCharacter.Character_Mood === 'serious'){
        //serious quirk arrays
    } else if(newCharacter.Character_Mood === 'silly'){
        //silly quirk arrays
    }
}