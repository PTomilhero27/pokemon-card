const fs = require('fs');
const environmentFilePath = './src/environments/environment.ts';

const targetEnvironment = process.argv[2] === 'prod' ? 'prod' : 'dev';
const apiKey = targetEnvironment === 'prod' ? '3a98b5e3-0f97-49c5-bff4-a89bb69d73ef' : '3a98b5e3-0f97-49c5-bff4-a89bb69d73ef';

const environmentFileContent = `
export const environment = {
  production: ${targetEnvironment === 'prod'},
  apiKey: '${apiKey}'
};
`;

fs.writeFile(environmentFilePath, environmentFileContent, (err) => {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log(`Environment file generated at ${environmentFilePath}`);
  }
});
