
function foo(a){
  if((Math.sqrt(a) + "").indexOf(".") <= 0){
    return false;
  }

  let sub = (Math.sqrt(a) + "");
  let sqr = sub.substr(sub.indexOf(".") + 1);

  let pow = (Math.pow(a,2) + "");

  for(let i = 0; i < pow.length;  i++){
    for(let k = 0; k < pow.length;  k++){
      if(sqr[k] == pow[i]){
        return true;
      }
    }
  }
  return false;
}
//console.log(foo(6));
const express = require('express')
const app = express()
app.get('/', (req,res) => {
  res.send(foo(req.query.check));
})
app.listen(4000, ()=> {
    console.log('Server_start on port');
});
