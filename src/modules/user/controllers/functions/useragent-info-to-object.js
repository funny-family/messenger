exports.useragentInfoToObject = function (userAgentString) {
  let userAgentObjectContainer = {};

  function getBooleanCharactersObject() {
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

  function getbrowserObject() {
    const stringifiedObject = userAgentString.match(/browser.\s+\'([^\']+)\'/gm);
    const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
    const browserObject = {
      browser: value
    };

    return browserObject;
  }

  function getBrowserVersionInfoObject() {
    const stringifiedObject = userAgentString.match(/version.\s+\'([^\']+)\'/gm);
    const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
    const browserVersionInfoObject = {
      version: value
    };

    return browserVersionInfoObject;
  }

  function getElectronVersionInfo() {
    const stringifiedObject = userAgentString.match(/electronVersion.\s+(\'([^\']+)\')|electronVersion.\s''/gm);
    let value = stringifiedObject.toString().match(/\'([^\']+)\'/gm);
    if (value === null) value = '';
    const electronVersionInfoObject = {
      electronVersion: value
    };

    return electronVersionInfoObject;
  }

  function getSourceInfoObject() {
    const stringifiedObject = userAgentString.match(/source.\s+\'([^\']+)\'/gm);
    const value = stringifiedObject.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '');
    const sourceInfoObject = {
      source: value
    };

    return sourceInfoObject;
  }

  userAgentObjectContainer = {
    ...getBooleanCharactersObject(),
    ...getbrowserObject(),
    ...getBrowserVersionInfoObject(),
    ...getElectronVersionInfo(),
    ...getSourceInfoObject()
  };
  return userAgentObjectContainer;
};
