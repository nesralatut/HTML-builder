require('fs').readdir(
  '03-files-in-folder/secret-folder',
  { withFileTypes: true },
  (_, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        require('fs').stat(
          `03-files-in-folder/secret-folder/${file.name}`,
          (_, stat) => {
            process.stdout.write(
              require('path').parse(
                `03-files-in-folder/secret-folder/${file.name}`
              ).name +
                ' - ' +
                require('path')
                  .parse(`03-files-in-folder/secret-folder/${file.name}`)
                  .ext.slice(1) +
                ' - ' +
                stat.size +
                ' bytes\n'
            );
          }
        );
      }
    });
  }
);
