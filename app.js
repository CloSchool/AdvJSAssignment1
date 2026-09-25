// Import two built-in packages.
const fs = require("fs/promises");
const path = require("path");

// Get the location of the books.json
const location = path.join(__dirname, "books.json");

// Import the books file.
const books = require(location);

// Async is the future.
async function main() {
    try {
        // List of folders.
        const folders = [
            path.join(__dirname, "backup"),
            path.join(__dirname, "order"),
            path.join(__dirname, "processed")
        ];

        // Loop through the folders and create them.
        for (const folder of folders)
            await fs.mkdir(folder);

        // Move the books file to the backup folder.
        await fs.rename(location, path.join(folders[0], "books.json"));

        const date = new Date().toISOString();

        // Sort books by ISBN.
        const order = books.sort((a, b) => a.isbn.localeCompare(b.isbn));

        // Save ordered books to the order folder.
        await fs.writeFile(path.join(folders[1], `book_order_${date}.json`), JSON.stringify(order, null, 4));

        // Copy the books file to the processed folder.
        await fs.cp(path.join(folders[0], "books.json"), path.join(folders[2], `book_processed_${date}.json`))
    } catch (error) {
        console.error("Error:", error);
    }
}

// Start the script.
main();