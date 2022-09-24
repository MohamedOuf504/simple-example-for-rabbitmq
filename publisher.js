const amqp = require('amqplib');

const msg = { Number: process.argv[2] }

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        // const result = await channel.assertQueue('jobs');

        channel.sendToQueue('jobs', Buffer.from(JSON.stringify(msg)))

        console.log(`job send successfully ${msg.Number}`);
    } catch (error) {
        console.error(error)
    }
}

connect()