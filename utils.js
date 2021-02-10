const fs = require('fs');
const mime = require('mime-types');

const fileSystem = () => {
  const exists = file => fs.accessSync(file)
  const getMime = file => mime.lookup(file);

  return ({
    exists,
    getMime
  });
};

module.exports = {
  fileSystem
};
