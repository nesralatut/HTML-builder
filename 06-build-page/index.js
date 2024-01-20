require('fs')
  .promises.rm('06-build-page/project-dist', {
    recursive: true,
    force: true,
  })
  .then(() => {
    require('fs').promises.mkdir('06-build-page/project-dist', {
      recursive: true,
    });
  })
  .then(() => {
    require('fs')
      .promises.readdir('06-build-page/styles')
      .then((files) => {
        files.forEach((file) => {
          if (file.slice(-4) === '.css') {
            require('fs')
              .createReadStream(`06-build-page/styles/${file}`)
              .pipe(
                require('fs').createWriteStream(
                  '06-build-page/project-dist/style.css',
                  { flags: 'a' }
                )
              );
          }
        });
      });
    require('fs')
      .promises.readdir('06-build-page/assets', {
        withFileTypes: true,
      })
      .then((folders) => {
        folders.forEach((folder) => {
          require('fs')
            .promises.mkdir(
              `06-build-page/project-dist/assets/${folder.name}`,
              {
                recursive: true,
              }
            )
            .then(() => {
              require('fs')
                .promises.readdir(`06-build-page/assets/${folder.name}`, {
                  withFileTypes: true,
                })
                .then((files) => {
                  Promise.all(
                    files.map((file) =>
                      require('fs').promises.copyFile(
                        `06-build-page/assets/${folder.name}/${file.name}`,
                        `06-build-page/project-dist/assets/${folder.name}/${file.name}`
                      )
                    )
                  );
                });
            });
        });
      });
    require('fs')
      .promises.readFile('06-build-page/template.html')
      .then((template) => {
        let html = template.toString();
        require('fs')
          .promises.readdir('06-build-page/components')
          .then((components) => {
            components.forEach((component) => {
              require('fs')
                .promises.readFile(`06-build-page/components/${component}`)
                .then((content) => {
                  html = html.replace(
                    `{{${component.split('.')[0]}}}`,
                    content
                  );
                  require('fs')
                    .createWriteStream('06-build-page/project-dist/index.html')
                    .write(html);
                });
            });
          });
      });
  });
