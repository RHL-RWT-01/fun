import kafka from "./client.js";

async function init(params) {
    const admin = kafka.admin();
    console.log("Connecting to Kafka admin...");
    await admin.connect();
    console.log("Connected to Kafka admin");

    console.log("Creating topic...");
    await admin.createTopics({
        topics: [
            {
                topic: "test-topic",
                numPartitions: 2,
                replicationFactor: 1,
            },
        ],
    }).then(() => {
        console.log("Topic created successfully");
    }).catch((error) => {
        console.error("Error creating topic:", error);
    })

    console.log("Disconnecting from Kafka admin...");
    await admin.disconnect();

}

init().then(() => {
    console.log("Admin initialization complete");
}).catch((error) => {
    console.error("Error during admin initialization:", error);
});

