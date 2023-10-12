// const http = require('http');
// const jawab = {
//     "Tera_naam": "Marry",
//     "sautakka": "Meri hai"
// };

// http.createServer(function (req, res) {
//     simulateAsyncOperation();
//     console.log(jawab)
//     res.writeHead(200, { 'Custom-Header': 'Header' }, { 'Content-Type': 'application/json' });
//     res.write(JSON.stringify(jawab));
//     res.end();
// }).listen(8080);

// function simulateAsyncOperation() {
//     setTimeout(() => {
//         if (jawab.hasOwnProperty("deva")){
//             delete jawab.deva
//         }else{
//         jawab.deva = "deva"
//         }
//         console.log("Async operation completed.");
//     }, 5000);
// }

// const http = require('http');

// const jawab = {
//     "Tera_naam": "Marry",
//     "sautakka": "Meri hai"
// }

// async function simulateAsyncOperation() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             if (jawab.hasOwnProperty("deva")){
//                 delete jawab.deva
//             }else{
//             jawab.deva = "deva"
//             }
//             resolve();
//         }, 8000);
//     });
// }

// http.createServer(async function (req, res) {
//     await simulateAsyncOperation();
//     res.writeHead(200, { 'Custom-Header': 'Header' }, { 'Content-Type': 'application/json' });
//     res.write(JSON.stringify(jawab));
//     res.end();
// }).listen(8080);
