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

let window, document, history;

const createRouter = function() {
    const routes = []
    

    function router(path, callback){
      if(typeof path === "object"){ 
        window = path.window
        document = window.document
        history = window.history
        window.addEventListener("popstate", () => redirectRoute(window.location.pathname))
        document.addEventListener("click", clickHandler)
    
        routes.forEach(route => {
          if (route.path == "/") {
            redirectRoute(route.path);
          }
        });
      } else {
          routes.push({
            path,
            method: callback(callback),
            regex: new RegExp(`^${path.replace(/:[a-z]+/g, "([a-zA-Z0-9]+)")}$`)
          })
      }
    }

    function redirectRoute(name){
      if (routes && routes.length == 0) {
        return router.error = new Error("error") 
      }

      routes.forEach(route => {
        if (route.regex.test(name)) {
          router.current = route.path
          if (router.current !== document.location.pathname) {
            history.pushState({}, '', route.path);
  }
        }
      });
     
    }

    function clickHandler(e){
      let target = e.target;
      if (document.location.host == target.host && !target.download && !target.rel && !target.target)  {
        redirectRoute(target.pathname)
      }
    }
  
  return router
}


export {createRouter}