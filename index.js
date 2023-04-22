// const CronJob = require('cron').CronJob;
const axios = require('axios');
const express = require('express');
require('dotenv').config();


const app = express();

const port = 3000;


const getDolarValue = async (res) => {
    try {
        const cotacao = await axios.get("https://economia.awesomeapi.com.br/last/USD-BRL");
        console.log(parseFloat(cotacao.data.USDBRL.high).toFixed(2))
      
        if (cotacao.status === 200) {
            console.log('Sending slack message!');
            try {
                await axios.post('https://slack.com/api/chat.postMessage',{
                    "channel": process.env.SLACK_CHANNEL_ID,
                    "text": `A cotação ${cotacao.data.USDBRL.name} hoje é de: ${parseFloat(cotacao.data.USDBRL.high).toFixed(2)} USD`
                }, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
                    }
                })

                res.send('success')
            } catch (error) {
                console.log('Error to post slack message: ', error)
            }
        }
    } catch (error) {
        console.log('Error to get dolar value: ', error)
    }
}

app.get('/', (req, res) => {
    console.log('Running job...')
    
    getDolarValue(res)

});

app.listen(port, () => console.log(`Listening on port ${port}!`))



// const job = new CronJob(
//     '0 */1 * * * *',
//     async function() {
//         getDolarValue()
//     },
//     null,
//     false,
//     'America/Sao_Paulo'
// );
// Use this if the 4th param is default value(false)

// job.start()

