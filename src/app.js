const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Raheem'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'This is about page',
        name: 'Raheem'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is a help page for weather app',
        title:'Help',
        name:'Raheem'
    })
})

app.get('/weather',(req,res) =>{

    if(!req.query.address){

        return res.send({
            error: 'No address provided'
        })
  
    }

       geocode(req.query.address,(error,{ latitude,longitude,location } = { }) => {

        if(error){
    
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({ error })
            }
            
            res.send({

                location,
                forecast : forecastData,
                address: req.query.address

            })

          })
    
    })
})

app.get('/help/*',(req,res) =>{

    res.render('404',{
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Raheem'
        
    })
})

app.get('*',(req,res) => {

    res.render('404',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Raheem'
    })
    
})

app.listen(3000, () => {
    console.log('server is up on 3000')
})