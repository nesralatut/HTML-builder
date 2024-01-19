require('fs')
  .promises.rm('05-merge-styles/project-dist/bundle.css', {
    recursive: true,
    force: true,
  })
  .then(() => require('fs').promises.readdir('05-merge-styles/styles'))
  .then((files) => {
    files.forEach((file) => {
      if (file.slice(-4) === '.css') {
        require('fs')
          .createReadStream(`05-merge-styles/styles/${file}`)
          .pipe(
            require('fs').createWriteStream(
              '05-merge-styles/project-dist/bundle.css',
              { flags: 'a' }
            )
          );
      }
    });
  });
