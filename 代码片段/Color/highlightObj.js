/**
 * 将json对象语法高亮的打印出来
 * @param {Object} json 需要打印出来的js对象
 * pre .string { color: #885800; }
 * pre .number { color: blue; }
 * pre .boolean { color: magenta; }
 * pre .null { color: red; }
 * pre .key { color: green; }
 * 一般将函数的返回值作为<pre>的innerHTML
 */
function highlightObj(json) {
  if (json) {
    json = JSON.stringify(json, undefined, 4)
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'number'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key'
        } else {
          cls = 'string'
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (/null/.test(match)) {
        cls = 'null'
      }
      return '<span class="' + cls + '">' + match + '</span>'
    })
  }
}

const input = {
  name: 'Jack',
  age: 20,
  hobby: ['football', 'pingpong']
}

console.log(highlightObj(input))

const output = '{\n' +
  '    <span class="key">"name":</span> <span class="string">"Jack"</span>,\n' +
  '    <span class="key">"age":</span> <span class="number">20</span>,\n' +
  '    <span class="key">"hobby":</span> [\n' +
  '        <span class="string">"football"</span>,\n' +
  '        <span class="string">"pingpong"</span>\n' +
  '    ]\n' +
  '}'
