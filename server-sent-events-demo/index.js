const app = require('express')()

const jobs = {}

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0;
    updateJob(jobId, 0)
    res.end("\n\n" + jobId + "\n\n")
})


app.get('/', async (req, res) => {
    res.send('hello!')
})


app.get('/stream', async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream")
    send(res)
})

let i = 0;
function send(res) {
    res.write("data: " + `hello from server ---- [${i++}]\n\n`)
    setTimeout(() => send((res), 1000))
}

app.listen(3020, () => console.log('listening on 3030'))
