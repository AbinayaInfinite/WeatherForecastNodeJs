const request = require("postman-request")

const forecast= (data,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=caffc900f8215e72ac14fb8407f1dafb&query="+data+"&units=f"
    request({url,json:true},(error,{body})=>{
    if (error){
        callback("Error in weather service!",undefined)
        }else if (body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". The current temperature is " + body.current.temperature + ". It feels like " + body.current.feelslike + "!")
        }
    })
}
module.exports = forecast