const express = require('express')
const axios = require('axios');
const app = express()
const router = express.Router()
const cors = require('cors');

app.use(express.json({ extended: false }))
app.use(cors());


router.get('/', (req, res) => {
    res.send('Hello World')
})

const getNewsDetails = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://newsapi.org/v2/top-headlines/sources?apiKey=ad1ecacc87084f099bbb912d0c87b04d')
            .then(response => resolve(response))
            .catch(err => reject(console.log(err)))
    })
}

const getFilterArticles = (q) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://newsapi.org/v2/everything?q=${q}&apiKey=ad1ecacc87084f099bbb912d0c87b04d`)
            .then(response => resolve(response))
            .catch(err => reject(console.log(err)))
    })
}
// get articles api
app.get('/getnews', async (req, res) => {
    let details = await getNewsDetails();
    res.send(JSON.stringify(details.data.sources));
})

//filtering articles api
app.get('/filterarticle', async (req, res) => {
    let filterarticleAarticles = await getFilterArticles(req.query.q);
    res.send(JSON.stringify(filterarticleAarticles.data.articles));
})

app.use('/', router)

const port = process.env.PORT || 3002
app.listen(port, () => {
    console.log(`Server started. Listening on port: ${port}`)
})