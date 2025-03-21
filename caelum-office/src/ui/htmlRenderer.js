export const renderHTML = (title, body) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
    </head>
    <body>
        ${body}
    </body>
    </html>`;
};