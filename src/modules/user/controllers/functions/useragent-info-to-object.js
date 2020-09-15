exports.useragentInfoToObject = async function (ctx) {
  const userAgentStringInfo = await require('util').inspect(ctx.userAgent);

  // const wordsStartWhithIs =
  // return userAgentStringInfo.replace(/is+\w{0,}/gm, () => console.log(userAgentStringInfo));

  // userAgentStringInfo.replace(/is+\w{0,}/gm, (match) => {
  //   console.log(match);
  // });

  const wordsStartWhithIs = userAgentStringInfo.match(/is+\w{0,}.\s(false|true)/gm);
  console.log(wordsStartWhithIs);
};
