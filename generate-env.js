const fs = require("fs");
const path = require("path");

// Define the output file path in the `public` directory
const envFilePath = path.join(__dirname, "public", "env.js");

// Create the env.js file dynamically
const envContent = `
const ENV = {
    EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID}",
    EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID}",
    EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY}",
};
`;

fs.writeFileSync(envFilePath, envContent, (err) => {
    if (err) {
        console.error("Error writing env.js:", err);
        process.exit(1);
    }
    console.log("env.js generated successfully at", envFilePath);
});
