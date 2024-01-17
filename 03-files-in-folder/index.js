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
              file.name.split('.')[0] +
                ' - ' +
                file.name.split('.')[1] +
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
