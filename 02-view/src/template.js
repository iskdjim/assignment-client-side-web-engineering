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
    do {
        console.log(template_string);
        tag = MATCH_ELEMENT.exec(template_string);
        console.log('--------')
        console.log(tag);
        if (tag) {
            console.log(tag);
            
            elements.set(tag[1], document.createElement(tag[1]));
            variables.set(tag[1], tag[2]);
        
            template_string = tag[2]
        }
    }  while (tag)
}

export function build(template_v1){
    parser(template_v1);
    return function(obj) {
        console.log(variables);
        const ele = document.createTextNode(obj.title);
        const h1 = elements.get('h1');
        h1.appendChild(ele);

        return {el: h1};
    }
   
}
/*
const template = build();
const {el, update} = template({title: 'Hello, World!'});
*/