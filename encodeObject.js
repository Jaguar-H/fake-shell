export const encode = (obj) => {
  let result = "L";
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === "object") {
      result += `${key}-${encode(value)}!`;
      continue;
    }
    result += `${key}-${value}!`;
  }
  return result + "E";
};

export const decode = (str) => {
  let i = 0;

  const parse = () => {
    const obj = {};

    i++;

    while (str[i] !== "E") {

      const hyphenIndex = str.indexOf("-",i);
      const key = str.slice(i,hyphenIndex)
      i = hyphenIndex + 1;

      if (str[i] === "L") {
        obj[key] = parse();
        i++
        continue;
      }
      const endingIndex = str.indexOf("!",i)
      const value = str.slice(i,endingIndex)

      i = endingIndex + 1

      obj[key] = isNaN(value) ? value : Number(value);
    }
    i++;
    return obj;
  };
  return parse();
};



