import { openDB } from "idb";

const initdb = async () =>
    openDB("jate", 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains("jate")) {
                console.log("jate database already exists");
                return;
            }
            db.createObjectStore("jate", {
                keyPath: "id",
                autoIncrement: true,
            });
            console.log("jate database created");
        },
    });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (code) => {
    console.log("Post to the database");

    // Open the database.
    const editorDb = await openDB("code", 1);

    // Open a transaction on the database.
    const tx = editorDb.transaction("editor", "readwrite");

    // Open the object store.
    const store = tx.objectStore("editor");

    // Add the data to the object store.
    const request = store.add({ code });

    // Wait for the database to complete the transaction.
    const result = await request;
    console.log("Data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
    console.log("GET from the database");

    // Open the database.
    const editorDb = await openDB("code", 1);

    // Open a transaction on the database.
    const tx = editorDb.transaction("editor", "readonly");

    // Open the object store.
    const store = tx.objectStore("editor");

    // Get all the data from the object store.
    const request = store.getAll();

    // Wait for the database to complete the transaction.
    const result = await request;
    console.log("result.value", result);
    return result;
};

initdb();
