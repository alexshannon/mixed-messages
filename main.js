const input = require('console-read-write');

async function main() {
  // Simple readline scenario
  input.write('I will echo whatever you write!');
  input.write(await input.read());

  // Simple question scenario
  input.write(`hello ${await input.ask('Who are you?')}!`);

  // Since you are not blocking the IO, you can go wild with while loops!

  input.write('Thanks! Now you may leave.');
}

main();