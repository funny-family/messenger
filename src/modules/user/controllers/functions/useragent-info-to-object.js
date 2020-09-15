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
  const userAgentInfoContainer = {};

  const ISvalues = [];
  const boolenValues = [];
  const boolenCharactersCpntainer = userAgentStringInfo.match(/is+\w{0,}.\s(false|true)/gm);

  for (let i = 0; i < boolenCharactersCpntainer.length; i++) {
    const key = boolenCharactersCpntainer[i].match(/is+\w{0,}/gm).toString();
    const value = boolenCharactersCpntainer[i].match(/false|true/gm).toString();
    ISvalues.push(key);
    boolenValues.push(value);
  }

  ISvalues.forEach((key, value) => {
    userAgentInfoContainer[key] = boolenValues[value];
  });

  return userAgentInfoContainer;
};
