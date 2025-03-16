import readline from "readline";



export const cli = readline.createInterface({

    input: process.stdin,

    output: process.stdout,

});



export const askQuestion = (query, callback) => {

    cli.question(query, (answer) => {

        callback(answer);

    });

};