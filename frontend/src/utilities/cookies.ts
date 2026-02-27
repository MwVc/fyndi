const get = (name: string) => {
  // extract cookies to cookies array
  const cookies: string[] = document.cookie.split("; ");

  // find match
  const matchedCookie = cookies.find((cookie) => cookie.startsWith(name + "="));

  // split the cookie
  const value = matchedCookie?.split("=")[1];

  //   return token;
  return value;
};

export const cookies = {
  get,
};
