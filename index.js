var CronJob = require('cron').CronJob;
var job = new CronJob(
    '* 1 * * * *',
    function() {
        console.log('You will see this message every minute');
    },
    null,
    false,
    'America/Sao_Paulo'
);
// Use this if the 4th param is default value(false)
job.start()