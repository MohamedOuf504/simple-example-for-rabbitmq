const amqp = require('amqplib');

async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")

        const channel = await connection.createChannel()

        const result = await channel.assertQueue('jobs');

        channel.consume('jobs', message => {
            const input = JSON.parse(message.content.toString())
            if (input.Number == 10) {
                channel.ack(message)

            }
            console.log(`Received job with input  ${input.Number}`);
        })

        console.log('Waiting For message ');
    } catch (error) {
        console.error(error)
    }
}

connect()


