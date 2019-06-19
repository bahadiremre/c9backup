
var request = require("request");
request("https://api.sunrise-sunset.org/json?lat=39.925533&lng=32.866287&date=today", function(error, response, body){
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log("Ankara gun dogumu...")
        console.log(convertUTC2Local(parsedData.results.sunrise))
        console.log("Ankara gun batimi...")
        console.log(convertUTC2Local(parsedData.results.sunset));
        //eval(require("locus"))
    }
})

//UTC saat lokal saate donustur
function convertUTC2Local(time){
    var hour= time.substring(0,time.indexOf(":"));
    var returnData = time.replace((hour+":"),(Number(hour)+3)+":");
    return returnData;
}