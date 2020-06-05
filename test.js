import http from "k6/http";

export default function() {
    //let host = 'http://localhost:3000'
    let host = "https://bonuts.ru"
    let authResponse = http.post(host+"/api/demo_authenticate")
 
    let token  = authResponse.json().auth_token 
   
    
    var url = host+"/api/events?page=1";

   
     let tenant ='demo';
     var params = {
         headers: {'Content-Type': 'application/json', 'Authorization': JSON.stringify({token:token, tenant:tenant})},
     };
     console.log(params.headers['Authorization'])
     let response = http.get(url,params);
     var myJSON = JSON.stringify(response);
     console.log(myJSON)
   
};

//k6 run --vus 100 --duration 100s test.js 