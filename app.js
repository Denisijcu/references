const url = "https://labdatacloud-a711f.firebaseio.com/references.json";
catchData(url)
  .catch(err => {
    console.log('error');
    console.error(err);
  });
async function catchData(url) {
  const response = await fetch(url);
  const dataNative = await response.json();
  $('#example').DataTable({
    ajax: dataNative
  });
  // console.log(dataNative);
  let table = '';


  let HCPCS = '';
  let ref = [];
  dataNative.forEach(ref => {
    console.log('reference', ref);
    ref = ref;
    if (ref['HCPCS r'] !== undefined) {
      HCPCS = ref['HCPCS r'].substring(0, 4);
    }

    table += `<tr>
    <td>${ref.StartDate}</td>
    <td>${ref.EndDate}</td>
    <td>${HCPCS}</td>
    </tr>`;

  });






  // document.querySelector('#mydata').innerHTML = table;
}