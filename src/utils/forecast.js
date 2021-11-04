const request=require('request')

const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=51d96a6d2003f58bd7d83649dac15cec&query="+lat+','+long
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect forecast service!',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,response.body.current.temperature)
        }
    })
}
module.exports=forecast