const axios = require('axios');
function StateWiseInfo(){
  return new Promise(function(resolve,reject){
    axios.get('https://api.covid19india.org/data.json')
      .then(response => { resolve(response.data) })
      .catch(err => { reject(err) })  
  })
}

function clayplay(){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(["mahes","suresh"])  
    },2000)
  })  
}

// StateWiseInfo()
//   .then(function(responseObtained){
//     return responseObtained.statewise;
//   })
//   .then(function(states){
//     var allStateInfos = [];
//     states.forEach(function(state){
//       let stateLexicalInfo = {
//         deaths: state.deaths,
//         active: state.active,
//         confirmed: state.confirmed,
//         recovered: state.recovered,
//         stateCode: state.statecode  
//       }
//       allStateInfos.push(stateLexicalInfo);
//     })
//     return allStateInfos
//   })
//   .catch(function(err){
//     console.log(err);
//   })

Promise.all([StateWiseInfo(),clayplay()])
  .then(function(values){
    console.log(values)  
  })
  .catch(function(err){
    console.log(err);
  })