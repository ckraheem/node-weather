const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4bf002574ca31e959cdf33ca5cacdd8d&query='+ encodeURIComponent(latitude)  +',' + encodeURIComponent(longitude) + ''

    request({url,json:true},(error,{body}) => {

        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
         

            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature  + ' degress out. There is a 0% chance of rain.')
        }

    })

}

module.exports = forecast