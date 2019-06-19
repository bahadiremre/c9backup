const rp = require("request-promise");

rp('https://jsonplaceholder.typicode.com/users')
    .then((body)=>{
        const parsedData = JSON.parse(body);
        // eval(require("locus"))
        parsedData.forEach((data,index)=>{
            console.log(`${index+1}) ${data.name} lives in ${data.address.city}`);
        })
        // console.log(`${parsedData.name} lives in ${parsedData.address.city}`);
    })
    .catch((err)=>{
        console.log('Error',err);
    })