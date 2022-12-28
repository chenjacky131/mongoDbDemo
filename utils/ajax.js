
function get(url){
  return new Promise((resolve, reject) => {
    let ajax = new XMLHttpRequest();
    ajax.open('GET', url);
    ajax.onreadystatechange = () => {
      if(ajax.readyState === 4 && ajax.status === 200){
        resolve(ajax.responseText);
      }
    }
    ajax.send();
  })
}
exports.get = get;