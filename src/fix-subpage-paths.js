const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "dist", "projects-page");

if (!fs.existsSync(dir)) process.exit(0);

fs.readdirSync(dir)
  .filter((f) => f.endsWith(".html"))
  .forEach((file) => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, "utf-8");

    // Prepend ../ to all relative href and src (skip #, http://, https://, mailto:, tel:)
    html = html.replace(
      /(href|src)="(?!#|https?:\/\/|mailto:|tel:|data:)/g,
      '$1="../'
    );

    fs.writeFileSync(filePath, html, "utf-8");
  });
