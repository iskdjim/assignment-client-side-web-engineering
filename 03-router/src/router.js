/**
 * Implement a dependency free global router for web browsers
 *
 * - It should allow static paths
 * - It should invoke function for "/" if defined on start
 * - It should have WILDCARD support * for catch all route
 * - It should never fail (provide error fallback)
 * - It should allow static redirects
 *
 * API:
 *
 * Static:
 * - page('/', index)
 *
 * Dynamic:
 * - page('/user/:user', show)
 * - page('/user/:user/edit', edit)
 * - page('/user/:user/album', album)
 * - page('/user/:user/album/sort', sort)
 *
 * Redirects:
 * - page('/home', index)
 * - page('/', '/home')
 *
 * Catch all:
 * - page('*', notfound)
 *
 * Start:
 * - page()
 */

let window

const createRouter = function() {
    const routes = []
    

    function router(path, callback){
      if(typeof path === "object"){ 
        window = path.window
        window.addEventListener("popstate", () => redirectRoute())

        routes.forEach(route => {
          if (route.path == "/") {
            redirectRoute(route.path);
          }
        });
      } else {
        if (path !== '*') {
          routes.push({
            path,
            method: callback,
            regex: new RegExp(`^${path}$`)
          })
        }
      }
    }

    function redirectRoute(pathname = window.location.pathname){
      if (routes && routes.length == 0) {
        return router.error = new Error("error") 
      }
   
      routes.forEach(route => {
        if (route.regex.test(pathname)) {
           router.current = route.path
        }
      });
     
    }
  
  return router
}


export {createRouter}