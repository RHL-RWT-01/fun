import kafka from "./client.js";



async function produce() {
    const producer = kafka.producer();
    console.log("Connecting to Kafka producer...");
    await producer.connect();
    console.log("Connected to Kafka producer");
    console.log("Sending message to topic 'test-topic'...");
    await producer.send({
        topic: "test-topic",
        messages: [
            {   
                partition: 0,
                key: "topic-1", value: JSON.stringify({
                    name: "test",
                    age: 20,
                    city: "Indore",
                    country: "India",
                    timestamp: new Date().toISOString(),
                })
            },
        ],
    }).then(() => {
        console.log("Message sent successfully");
    }).catch((error) => {
        console.error("Error sending message:", error);
    });
    console.log("Disconnecting from Kafka producer...");
    await producer.disconnect();
    console.log("Disconnected from Kafka producer");
}

produce().then(() => {
    console.log("Producer operation complete");
}).catch((error) => {
    console.error("Error during producer operation:", error);
});