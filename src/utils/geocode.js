const request = require("postman-request")

const geoCode = (address,callback)=>{
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWJpbmF5YXNla2FyIiwiYSI6ImNsNGt5emcwMTBsYmkzY2xoZWRvNGtlbWsifQ.bM6NOwcifq0KAMDzjAW14A&limit=1"

    request({url:geocodeUrl,json:true},(error,response)=>{
        var data = ""
        if(error){
            callback("Error in Geolocation service!",undefined)
        }else if(response.body.features.length===0){
            callback("Unable to fetch the location",undefined)
        }else{
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            data = latitude +","+longitude
            callback(undefined,data)
        }
        
    })
}


module.exports = geoCode