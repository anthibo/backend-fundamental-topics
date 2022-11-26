# Long polling demo
A simple express server which has two endpoints to submit a new job and get the job id and another endpoint (which applies long polling technique) to respond when the job is completed


### Submit a new job  
```bash
curl -X POST http://localhost:3030/submit
```
Response: `job:1669459087540`

### Get the status of a job  
```bash
curl -X GET http://localhost:3030/checkstatus\?jobId\=job:1669459087540
```
response will be held until the job is completed
Response: `JobStatus: Complete 100%`

