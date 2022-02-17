// https://stackoverflow.com/questions/1354999/keep-me-logged-in-the-best-approach 

let pageId = `get from page url`;
let uuid = require("crypto").randomBytes(64).toString('hex');
insertIntoDb(pageId, uuid);
saveToSecureHttpOnlySameSiteCookie("userData", uuid);


function isUserAdmin() {
  let cookieString = getCookie("userData");
  if (cookieString) {
    if (!pageData.uuids.includes(cookieString)) {
      return false;
    } else {
      return true;
    }
  }
}