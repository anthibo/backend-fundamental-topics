const amqp = require('amqplib')

const msg = {number: process.argv[2]}

connect()

async function connect(){
  try{
    const amqpServer = "amqps://adbodziv:3OTwEehEEvPpDVUefFGs8YuirHcmqhb5@rat.rmq2.cloudamqp.com/adbodziv"
    const connection = await amqp.connect(amqpServer)
    const channel = await connection.createChannel()

    await channel.assertQueue('jobs')
    await channel.consume('jobs', message => {
      const input = JSON.parse(message.content.toString())

      console.log(`Received job with input ${input.number}`)
      if(input.number == 7){
        // only acknowledge input of number 7
        channel.ack(message)
      }
    })
    console.log(`Waiting for messages`)
  }
  catch (err) {
    console.log(err)
  }
}