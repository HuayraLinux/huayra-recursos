const fs = require('fs');

const fileSystem = () => {
  const readDir = path => fs.readdirSync(path);

  return ({
    readDir
  });
};

module.exports = {
  fileSystem
};
