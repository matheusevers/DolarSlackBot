const CronJob = require('cron').CronJob;
const axios = require('axios');
require('dotenv').config();

const getDolarValue = async () => {
    const cotacao = await axios.get("https://economia.awesomeapi.com.br/last/USD-BRL");
      
      if (cotacao.status === 200) {
        console.log('Sending slack message!');
        await axios.post('https://slack.com/api/chat.postMessage',{
            "channel": process.env.SLACK_CHANNEL_ID,
            "text": `A cotação ${cotacao.data.USDBRL.name} hoje é de: ${cotacao.data.USDBRL.high} USD`
        }, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        })

      }
}

const job = new CronJob(
    '0 */1 * * * *',
    async function() {
        getDolarValue()
    },
    null,
    false,
    'America/Sao_Paulo'
);
// Use this if the 4th param is default value(false)
job.start()

