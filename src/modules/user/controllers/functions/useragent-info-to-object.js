exports.useragentInfoToObject = function (koaUserAgentString) {
  let userAgentInfoContainer = {};

  const boolenCharactersContainer = {};
  const ISvalues = [];
  const boolenValues = [];
  const boolenCharacters = koaUserAgentString.match(/is+\w{0,}.\s(false|true)/gm);

  for (let i = 0; i < boolenCharacters.length; i++) {
    const key = boolenCharacters[i].match(/is+\w{0,}/gm).toString();
    let value = boolenCharacters[i].match(/false|true/gm).toString();
    if (value === 'false') {
      value = false;
    } else {
      value = true;
    }
    ISvalues.push(key);
    boolenValues.push(value);
  }

  ISvalues.forEach((key, value) => {
    boolenCharactersContainer[key] = boolenValues[value];
  });

  const browerNameInfo = koaUserAgentString.match(/browser.\s+\'([^\']+)\'/gm);
  const browerNameInfoContainer = {
    browser: browerNameInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
  };

  const browserVersionInfo = koaUserAgentString.match(/version.\s+\'([^\']+)\'/gm);
  const browserVersionInfoContainer = {
    version: browserVersionInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
  };

  const electronVersionInfo = koaUserAgentString.match(/electronVersion.\s+(\'([^\']+)\')|electronVersion.\s''/gm);
  let electronVersionInfoString = electronVersionInfo.toString().match(/\'([^\']+)\'/gm);
  if (electronVersionInfoString === null) electronVersionInfoString = '';
  const electronVersionInfoContainer = {
    electronVersion: electronVersionInfoString
  };

  const sourceInfo = koaUserAgentString.match(/source.\s+\'([^\']+)\'/gm);
  const sourceInfoContainer = {
    source: sourceInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
  };

  userAgentInfoContainer = {
    ...boolenCharactersContainer,
    ...browerNameInfoContainer,
    ...browserVersionInfoContainer,
    ...electronVersionInfoContainer,
    ...sourceInfoContainer
  };
  return userAgentInfoContainer;
};
