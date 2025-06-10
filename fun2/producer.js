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
