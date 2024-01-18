require('fs')
  .promises.rm(
    '04-copy-directory/files-copy',
    { recursive: true,
      force: true
    }
  )
  .then(() =>
    require('fs').promises.mkdir(
      '04-copy-directory/files-copy',
      { recursive: true }
    )
  )
  .then(() =>
    require('fs').promises.readdir(
      '04-copy-directory/files',
      { withFileTypes: true }
    )
  )
  .then((files) =>
    Promise.all(
      files.map((file) =>
        require('fs').promises.copyFile(
          `04-copy-directory/files/${file.name}`,
          `04-copy-directory/files-copy/${file.name}`
        )
      )
    )
  );
