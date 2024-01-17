process.stdout.write('hello! enter your text please...\n');

process.stdin.on('data', (data) => {
  data.toString().trim() === 'exit'
    ? process.exit()
    : require('fs').createWriteStream('02-write-file/text.txt').write(data);
});

process.on('SIGINT', process.exit);

process.on('exit', () => process.stdout.write('goodbye!\n'));
