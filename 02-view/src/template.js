/**
 * Implement a view engine:
 *
 * - Parse HTML string
 * - Create according elements: node, text, variable
 * - Implement update function
 *
 * API:
 *
 * const template = build('<h1>{{title}}</h1>');
 * const {el, update} = template({title: 'Hello, World!'});
 * el.outerHTML // <h1>Hello, World!</h1>
 * update({title: 'Hallo Welt!'});
 * el.outerHTML // <h1>Hallo, Welt!</h1>
 */
const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;


const elements = new Map();
const variables = new Map();
function parser(template_string) {
    let tag;
    while (tag = MATCH_ELEMENT.exec(template_string)) {
        if (tag) {
            
            elements.set(tag[1], document.createElement(tag[1]));
            
            parser(tag[2])
            let variable = MATCH_VARIABLE.exec(tag[2]);
            if(variable) {
                variables.set(tag[1],variable[1]);
            }
        
            template_string = tag[2]
        }
    } 
    return elements
}

export function build(template_v1){
    parser(template_v1);
    return function(obj) {
        let ele;
        let counter = 0;
        for(let e of elements){
            counter++;
            //onsole.log(elemnts);
            if(elements.size === counter) {
                const textNode = document.createTextNode(obj[variables.get(e[0])]);
                e[1].appendChild(textNode);
            }
            if (ele) {
                ele.appendChild(e[1]);
            } else {
             
                ele = e[1];
            }

            
        }
      
        const update = (data) => {
            let key = Array.from(elements.keys())[elements.size-1];   
            let e = elements.get(key); 
            
            e.textContent = data[variables.get(key)];
        
          }

        return {el: ele, update};
    }
   
}
