/**
 * Delete a cookie
 * @param  {String}   name The name of the cookie to delete
 */
export default async () => {
  // Clear cookies
  browser.deleteAllCookies();

  // Clear local storage
  browser.execute(() => {
    localStorage.clear();
  });

  // Clear session storage
  browser.execute(() => {
    sessionStorage.clear();
  });
};
