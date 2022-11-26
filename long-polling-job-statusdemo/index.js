const app = require('express')()

const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId, 0)
    res.end("\n\n" + jobId + "\n\n")
})

app.get('/checkstatus', async (req, res) => {
    const jobId = req.query.jobId
    console.log(jobs[jobId])
    while ((await checkJobComplete(jobId) === false)){}
    res.end("\n\nJobStatus: Complete " + jobs[jobId] + "%\n\n")
})

app.listen(3030, () => console.log('listening on 3030'))

async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if (jobs[jobId] < 100) {
            this.setTimeout(() => resolve(false), 1000);
        } else {
            resolve(true)
        }
    })
}


function updateJob(jobId, prg) {
    jobs[jobId] = prg
    console.log(`updated ${jobId} to ${prg}`)
    if (prg === 100) {
        return true
    }
    this.setTimeout(() => updateJob(jobId, prg + 10), 3000);
}
