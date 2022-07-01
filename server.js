const 
  request = require("request"), 
  express = require("express"), 
  http = require("http"),
  bodyParser = require('body-parser')
;

require('dotenv').config()

const app = express()
const server = http.createServer(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json('application/json'))
app.post("/discordservers", (req, res) => {
  try {
    const { authorization } = req.headers
    const { id, user, type } = req.body
    
    if (authorization === process.env.token) {

      if (type === "test") {
        return res.send(JSON.stringify({ success: true, message: 'Test vote successfully.' }))
      }

      var params = JSON.stringify({
        'username': `${process.env.DiscordWebhookTitle}`,
        'avatar_url': `${process.env.DiscordWebhookIcon}`,
        'embeds': [{
            'title': `${process.env.DiscordWebhookTitle}`,
            'description': `<@${user.id}> 將神聖的一票投給了 <@${id}>`,
            'color': 15258703,
            'thumbnail': {
                'url': `https://cdn.discord.com/avatars/${user.id}/${user.avatar}`,
            },
        }],
      });

      var options = {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'url': `${process.env.DiscordWebhookUrl}`,
        'body': params
      };

      request(options, function (error, response) {
        if (error) console.log(error)
      });
      
      return res.send(JSON.stringify({ success: true, message: 'Vote successfully.' }))

    } else {
      return res.send(JSON.stringify({ success: false, message: 'Authorization failed.' }))
    }    
  } catch (error) {
    return res.send(JSON.stringify({ success: false, message: `Server error: ${error}` }))
  }
});

server.listen(process.env.port, () => {
  console.log(`Webserver running on 127.0.0.1:${process.env.port}`)
});