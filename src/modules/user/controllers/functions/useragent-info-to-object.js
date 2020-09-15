exports.useragentInfoToObject = async function (ctx) {
  const userAgentStringInfo = await require('util').inspect(ctx.userAgent);

  // const wordsStartWhithIs =
  // return userAgentStringInfo.replace(/is+\w{0,}/gm, () => console.log(userAgentStringInfo));

  // userAgentStringInfo.replace(/is+\w{0,}/gm, (match) => {
  //   console.log(match);
  // });

  // const wordsStartWhithIs = userAgentStringInfo.match(/is+\w{0,}.\s(false|true)/gm);
  // console.log(wordsStartWhithIs);

  const wordsStartWhithIs = userAgentStringInfo.match(/is+\w{0,}/gm);
  const wordsStartWhithIsValue = userAgentStringInfo.match(/false|true/gm);

  // console.log(Object.keys(wordsStartWhithIs).map((key) => [Number(key), wordsStartWhithIs[key]]));
  const container = [];
  for (let i = 0; i < container.length; i++) {
    container.pop(wordsStartWhithIs[i]);
  }
  console.log(container);

  const boolenUserAgentValues = {};
  wordsStartWhithIs.foreach((key, value) => {
    boolenUserAgentValues[key] = wordsStartWhithIsValue[value];
  });

  console.log(boolenUserAgentValues);
};
