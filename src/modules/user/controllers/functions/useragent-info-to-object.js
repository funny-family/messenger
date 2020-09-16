exports.useragentInfoToObject = function (ctx) {
  const userAgentStringInfo = require('util').inspect(ctx.userAgent);

  // return userAgentStringInfo.replace(/is+\w{0,}/gm, () => console.log(userAgentStringInfo));

  // userAgentStringInfo.replace(/is+\w{0,}/gm, (match) => {
  //   console.log(match);
  // });

  // const wordsStartWhithIs = userAgentStringInfo.match(/is+\w{0,}.\s(false|true)/gm);
  // console.log(wordsStartWhithIs);

  // const wordsStartWhithIs = userAgentStringInfo.match(/is+\w{0,}/gm);
  // const wordsStartWhithIsValue = userAgentStringInfo.match(/false|true/gm);

  // console.log(Object.keys(wordsStartWhithIs).map((key) => [Number(key), wordsStartWhithIs[key]]));
  // const container = [];
  // for (let i = 0; i < container.length; i++) {
  //   container.pop(wordsStartWhithIs[i]);
  // }
  // console.log(container);

  // const boolenUserAgentValues = {};
  // wordsStartWhithIs.foreach((key, value) => {
  //   boolenUserAgentValues[key] = wordsStartWhithIsValue[value];
  // });

  // return {
  //   wordsStartWhithIs,
  //   wordsStartWhithIsValue
  // };

  let userAgentInfoContainer = {};

  const boolenCharactersContainer = {};
  const ISvalues = [];
  const boolenValues = [];
  const boolenCharacters = userAgentStringInfo.match(/is+\w{0,}.\s(false|true)/gm);

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

  const browerInfo = userAgentStringInfo.match(/browser.\s+\'([^\']+)\'/gm);
  const browerInfoContainer = {
    browser: browerInfo.toString().match(/\'([^\']+)\'/gm).toString().replace(/['"]+/g, '')
  };
  // browser.\s+
  // words in single quotes \'([^\']+)\'

  userAgentInfoContainer = {
    ...boolenCharactersContainer,
    ...browerInfoContainer
  };
  // console.log(typeof userAgentInfoContainer.isYaBrowser);
  return userAgentInfoContainer;
};
