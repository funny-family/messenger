function getBooleanCharactersObject(userAgentString) {
  const booleanCharactersObject = {};

  const objectKeysContainer = [];
  const objectValuesContainer = [];
  const boolenCharacters = userAgentString.match(/is+\w{0,}.\s(false|true)/gm);

  for (let i = 0; i < boolenCharacters.length; i++) {
    const key = boolenCharacters[i].match(/is+\w{0,}/gm).toString();
    let value = boolenCharacters[i].match(/false|true/gm).toString();
    if (value === 'false') {
      value = false;
    } else {
      value = true;
    }
    objectKeysContainer.push(key);
    objectValuesContainer.push(value);
  }

  objectKeysContainer.forEach((key, value) => {
    booleanCharactersObject[key] = objectValuesContainer[value];
  });

  return booleanCharactersObject;
}

function getbrowserObject(userAgentString) {
  const stringifiedObject = userAgentString.match(/browser.\s+\'([^\']+)\'/gm);
  const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
  const object = {
    browser: value
  };

  return object;
}

function getElectronVersionInfo(userAgentString) {
  const stringifiedObject = userAgentString.match(/electronVersion.\s+(\'([^\']+)\')|electronVersion.\s''/gm);
  let value = stringifiedObject.toString().match(/\'([^\']+)\'/gm);
  if (value === null) value = '';
  const object = {
    electronVersion: value
  };

  return object;
}

function getSourceInfoObject(userAgentString) {
  const stringifiedObject = userAgentString.match(/source.\s+\'([^\']+)\'/gm);
  const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
  const object = {
    source: value
  };

  return object;
}

function getBrowserVersionInfoObject(userAgentString) {
  const stringifiedObject = userAgentString.match(/version.\s+\'([^\']+)\'/gm);
  const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
  const object = {
    version: value
  };

  return object;
}

exports.getUseragentInfo = function (ctx) {
  const userAgentString = require('util').inspect(ctx.userAgent);
  let userAgentObjectContainer = {};

  const booleanCharactersObject = getBooleanCharactersObject(userAgentString);
  const browserObject = getbrowserObject(userAgentString);
  const electronVersionObject = getElectronVersionInfo(userAgentString);
  const sourceObject = getSourceInfoObject(userAgentString);
  const browserVersionObject = getBrowserVersionInfoObject(userAgentString);

  userAgentObjectContainer = {
    ...booleanCharactersObject,
    ...browserObject,
    ...browserVersionObject,
    ...electronVersionObject,
    ...sourceObject
  };

  return userAgentObjectContainer;
};
