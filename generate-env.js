const fs = require("fs");

// Generate env.js dynamically from environment variables
const envContent = `
const ENV = {
    EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID}",
    EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID}",
    EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY}",
};
`;

fs.writeFileSync("env.js", envContent, (err) => {
    if (err) {
        console.error("Error writing env.js:", err);
        process.exit(1);
    }
    console.log("env.js generated successfully!");
});
