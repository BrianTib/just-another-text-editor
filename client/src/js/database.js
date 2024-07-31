import { openDB } from "idb";

const initdb = async () => {
    openDB("jate", 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains("jate")) {
                console.log("jate database already exists");
                return;
            }
            db.createObjectStore("jate", {
                keyPath: "id",
            });
            console.log("jate database created");
        },
    });
};

// Method to add content to the database
export const putDb = async (content) => {
    console.log("Post to the database");

    // Open the database.
    const db = await openDB("jate", 1);

    // Open a transaction on the database.
    const tx = db.transaction("jate", "readwrite");

    // Open the object store.
    const store = tx.objectStore("jate");

    // Add the data to the object store.
    const request = store.put({ content, id: 1 });

    // Wait for the database to complete the transaction.
    const result = await request;
    console.log("Data saved to the database", result);
    return result;
};

// Method to get all content from the database
export const getDb = async () => {
    console.log("GET from the database");

    // Open the database.
    const db = await openDB("jate", 1);

    // Open a transaction on the database.
    const tx = db.transaction("jate", "readonly");

    // Open the object store.
    const store = tx.objectStore("jate");

    // Get the data from the object store.
    const request = store.get(1);

    // Wait for the database to complete the transaction.
    const result = await request;
    console.log("Hopefully content:", result);
    return result?.content;
};

initdb();
