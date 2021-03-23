const input = require('console-read-write');

async function main() {
  //all this is for pulling intital user preferences for their generated character
  input.write('Hello! Welcome to Wacky DnD character Generator!');
  input.write('What would you like to name your character?');
  const characterName = await input.read();
  input.write('Would you like to be ranged, melee, or a caster?')
  const characterRole = await input.read();
  input.write('Do you want your character serious or silly?')
  const seriousOrSilly = await input.read();
  if(seriousOrSilly === 'serious' || seriousOrSilly === 'silly'){
    if(characterRole === 'ranged' || characterRole === 'melee' || characterRole === 'caster'){
        console.log(`Thanks! Making ${characterName} now...`)
        charGen(characterName, characterRole, seriousOrSilly)
      } else{
          input.write('Oh no! You entered an invalid role. Exiting.')
      }
  } else {
      input.write('Oh no! You entered an invalid serious-ness value. Exiting.')
  }
  
}

main();

const charGen = (name, role, mood, stats) => {
    return{
    Character_Name: name,
    Character_Roll: role,
    Character_Mood: mood,
    Character_Stats: stats,
    set stats(statRoll){
        this.push(statRoll)
    },
    }
}

function statRoll(){
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
    let statArray = [];
    do{
    statArray.push(statRoll())
    } while(statArray.length < 6)
    statArray.sort()

    if(charGen.role === 'melee'){
        //strength as highest; int as lowest
    } else if(charGen.role === 'ranged'){
        // ...dex as highest? gotta check
    } else{
        //return wisdom/int as highest
    }
}