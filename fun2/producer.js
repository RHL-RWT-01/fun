import kafka from "./client.js";

async function produce() {
    const producer = kafka.producer();
    console.log("Connecting to Kafka producer...");
    await producer.connect();
    console.log("Connected to Kafka producer");

    let counter = 1;

    const interval = setInterval(async () => {
        const message = {
            name: `User${counter}`,
            age: 20 + (counter % 10),
            city: "Indore",
            country: "India",
            messageNumber: counter,
            timestamp: new Date().toISOString(),
        };

        try {
            await producer.send({
                topic: "test-topic",
                messages: [
                    {
                        key: `key-${counter}`,
                        value: JSON.stringify(message),
                    },
                ],
            });
            console.log(`Sent message ${counter}:`, message);
        } catch (err) {
            console.error("Error sending message:", err);
            clearInterval(interval);
            await producer.disconnect();
            process.exit(1);
        }

        counter++;

        // Stop after sending 10 messages
        if (counter > 10) {
            clearInterval(interval);
            await producer.disconnect();
            console.log("Disconnected from Kafka producer after sending 10 messages.");
        }
    }, 2000); // every 2 seconds
}

produce().catch((err) => {
    console.error("Error during producer operation:", err);
    process.exit(1);
});

// This code connects to a Kafka producer, sends messages every 2 seconds, and disconnects after sending 10 messages.
// It handles errors during message sending and ensures the producer is disconnected properly.
// The messages sent include user details and a timestamp, formatted as JSON.
// The producer is set to send messages to the "test-topic" topic.  
// The messages are sent with a key to ensure they are distributed across partitions in the topic.
// The code uses the KafkaJS library to interact with Kafka, and it logs the status of the connection and message sending process.
// The producer is designed to run indefinitely, sending messages until it reaches the limit of 10 messages.
// The interval for sending messages is set to 2 seconds, allowing for a steady stream of data to be produced.
// The code is structured to handle asynchronous operations using async/await, ensuring that the producer connects and disconnects properly.
// The producer is initialized with a counter that increments with each message sent, allowing for unique message content.
// The messages include a name, age, city, country, message number, and timestamp, providing a realistic data structure for testing.    
// The code is designed to be run in a Node.js environment, leveraging the KafkaJS library for Kafka interactions.
// The producer is set up to handle errors gracefully, logging any issues encountered during the message sending process.