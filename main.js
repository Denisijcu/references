var fs = require('fs');


let dateFormat = require('dateformat');
const axios = require('axios');
const url = "https://labdatacloud-a711f.firebaseio.com/references.json";
let fileContent = `
 {
   "data": [
 
`;



axios({
    method: 'get',
    url: url,
    responseType: 'json'
  })
  .then((response) => {
    console.log(response.data);

    create(response.data);

  });






function create(dataNative) {


  let HCPCS = '';

  dataNative.forEach(ref => {
    ref = ref;
    if (ref['HCPCS r'] !== undefined) {
      HCPCS = ref['HCPCS r'].substring(0, 4);
    }
    fileContent += `[ "${dateFormat(ref.StartDate,'dddd, mmmm dS, yyyy, h:MM:ss TT')}","${dateFormat(ref.EndDate,'dddd, mmmm, yyyy, h:MM:ss TT')}","${HCPCS}"],`;
  });




  fileContent += '["","",""]]}';
  var filepath = "mynewfile.txt";
  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log("The file was succesfully saved!");
  });
}