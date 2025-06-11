import kafka from "./client.js";

async function init() {
    const admin = kafka.admin();
    console.log("Connecting to Kafka admin...");
    await admin.connect();
    console.log("Connected to Kafka admin");

    console.log("Creating topics...");
    await admin.createTopics({
        topics: [
            {
                topic: "test-topic",
                numPartitions: 2,
                replicationFactor: 1,
            },
            {
                topic: "audit-topic",
                numPartitions: 1,
                replicationFactor: 1,
            },
        ],
    }).then((created) => {
        if (created) {
            console.log("Topics created successfully");
        } else {
            console.log("Topics already existed or no new topics created");
        }
    }).catch((error) => {
        console.error("Error creating topics:", error);
    });

    console.log("Disconnecting from Kafka admin...");
    await admin.disconnect();
    console.log("Disconnected from Kafka admin");
}

init().then(() => {
    console.log("Admin initialization complete");
}).catch((error) => {
    console.error("Error during admin initialization:", error);
});
