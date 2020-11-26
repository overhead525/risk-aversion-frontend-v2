export const parseClassName = (classes: string | string[]) => {
  if (typeof classes === "string") {
    return classes;
  } else if (Array.isArray(classes)) {
    return classes.join(" ");
  }
};

export const removeHashtag = (path: string) => {
  return path.replace("#", "");
};
