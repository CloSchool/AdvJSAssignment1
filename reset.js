// Import two built-in packages.
const fs = require("fs/promises");
const path = require("path");

// Async is the future.
async function main() {
    try {
        // List of folders.
        const folders = [
            path.join(__dirname, "backup"),
            path.join(__dirname, "order"),
            path.join(__dirname, "processed")
        ];

        // Move the books file back to its original location.
        await fs.rename(path.join(folders[0], "books.json"), path.join(__dirname, "books.json"));

        // Loop through the folders and delete them.
        for (const folder of folders)
            await fs.rm(folder, { recursive: true });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Start the script.
main();