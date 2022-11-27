const amqp = require('amqplib')

const msg = {number: process.argv[2]}

connect()

async function connect(){
  try{
    const amqpServer = "amqps://adbodziv:3OTwEehEEvPpDVUefFGs8YuirHcmqhb5@rat.rmq2.cloudamqp.com/adbodziv"
    const connection = await amqp.connect(amqpServer)
    const channel = await connection.createChannel()

    await channel.assertQueue('jobs')
    await channel.sendToQueue('jobs', Buffer.from(
        JSON.stringify(msg)
    ))
    console.log(`Job sent successfully ${msg.number}`)
    await channel.close()
    await connection.close();
  }
  catch (err) {
    console.log(err)
  }
}