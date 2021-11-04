const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000
//Define paths for express config 
const publicPath = path.join(__dirname, '../public')
const viewPAth = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars 
app.set('view engine', 'hbs')
app.set('views', viewPAth)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        appname: 'Andreas'
    })
}
)
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        appname: 'Ion'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'I can help you'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return  res.send({
            error:"You must provide a search term"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecasData)=>{
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecasData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send(
    //     { forecast: 'urat' ,
    //     address:req.query.address
    //     })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:"You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})