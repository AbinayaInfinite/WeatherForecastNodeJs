const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { response } = require("express")
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")


console.log(__dirname)//E:\Abinaya\NodeJS\web-server\src
console.log(path.join(__dirname,"../public"))//E:\Abinaya\NodeJS\web-server\public. ".."goes up one folder

const app = express()
const port = process.env.PORT || 3000

//Define path for Express
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")//handlebars helps in dynamic content
app.set("views",viewsPath)//set the views path to access the handlebars files
hbs.registerPartials(partialsPath)

//set up static files
app.use(express.static(publicDirectoryPath))


//Route handlers
app.get("",(req,res)=>{
    res.render("index",{
        title: "Weather App",
        name: "Abinaya"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Abinaya",
        message:"For help contact abi@gmail.com"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Abinaya"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        })
    }

    geoCode(req.query.address,(error,data)=>{
        if(error){
            res.send({
                title:"error",
                message:error
            })
        }else{
            forecast(data,(error,weatherData)=>{
                if(error){
                    res.send({
                        title:"error",
                        message:error
                    })
                }else{
                    if(weatherData[0].length===0){
                        res.send({
                            message:"Please give the right address"
                        })
                    }else{
                        res.send({
                            message:weatherData
                        })
                    }
                }
            })
        }
    })
})


app.get("/help/*",(req,res)=>{
    res.render("404page",{
        name:"Abinaya",
        title:"404",
        message:"Help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404page",{
        name:"Abinaya",
        title:"404",
        message:"Page not Found"
    })
})


//Set up the server
app.listen(port,()=>{
    console.log("server is up and running at " + port+"!")
})