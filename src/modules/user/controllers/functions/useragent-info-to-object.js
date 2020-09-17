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

  function getBrowerInfoObject() {
    const browerInfo = userAgentString.match(/browser.\s+\'([^\']+)\'/gm);
    const browerInfoObject = {
      browser: browerInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
    };

    return browerInfoObject;
  }

  function getBrowserVersionInfoObject() {
    const browserVersionInfo = userAgentString.match(/version.\s+\'([^\']+)\'/gm);
    const browserVersionInfoObject = {
      version: browserVersionInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
    };

    return browserVersionInfoObject;
  }

  function getElectronVersionInfo() {
    const electronVersionInfo = userAgentString.match(/electronVersion.\s+(\'([^\']+)\')|electronVersion.\s''/gm);
    let electronVersionInfoString = electronVersionInfo.toString().match(/\'([^\']+)\'/gm);
    if (electronVersionInfoString === null) electronVersionInfoString = '';
    const electronVersionInfoObject = {
      electronVersion: electronVersionInfoString
    };

    return electronVersionInfoObject;
  }

  const sourceInfo = userAgentString.match(/source.\s+\'([^\']+)\'/gm);
  const sourceInfoObject = {
    source: sourceInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
  };

  userAgentObjectContainer = {
    ...getBooleanCharactersObject(),
    ...getBrowerInfoObject(),
    ...getBrowserVersionInfoObject(),
    ...getElectronVersionInfo(),
    ...sourceInfoObject
  };
  return userAgentObjectContainer;
};
