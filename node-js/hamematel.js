function compareJSON(a, b){
  var str_1 = a.substr(a.indexOf('{') + 1, a.indexOf(','));
  for(i in str_1){
    if(b[i] != str_1[i]){
      console.log(b.substr(b.indexOf('{') + 1, b.indexOf(',')));
      console.log(str_1);
      break;
    }
  }
  str_1 = a.substr(a.indexOf(',') + 2, a.indexOf('}'));
  b = b.substr(b.indexOf(',') + 2, b.indexOf('}'));

  for(i in str_1){
    if(b[i] != str_1[i]){
      console.log(b);
      console.log(str_1);
      break;
    }
  }
  // console.log(str_1);
   console.log(a.length);
}
compareJSON('{"a":5, "b":"str"}','{"a":2, "b":"str_"}');
