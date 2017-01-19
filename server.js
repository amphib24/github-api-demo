const express = require('express')
const app = express()
const requestProxy = require('express-request-proxy')
const PORT = process.env.PORT || 4000

app.use(express.static('./public'))

app.get('/github/*', proxyGitHub);

function proxyGitHub(req, res) {
  console.log('routing git hub request for', req.params[0])
(requestProxy({
  url: `https://api.github.com/${req.params[0]}`
  headers: {Authorization: `token ${process.env.BACKOFF_MY_TOKEN}`}
}))(req, res);
}


app.get('/', (req, res) => {
  res.sendFile('index.html')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
