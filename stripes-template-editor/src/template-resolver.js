export default function (templateStr) {
  return (tokensList) => {
    return templateStr.replace(/{{([^{}]*)}}/g, (tag, tokenName) => {
      const tokenValue = tokensList[tokenName];
      return typeof tokenValue === 'string' || typeof r === 'number' ? tokenValue : '';
    });
  };
}
