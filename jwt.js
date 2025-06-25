const jwt = require("jsonwebtoken");

//decode, verify, generate

const value = {
    name: "Blake",
    accountNumber: 12345678,
}

//jwt
const token = jwt.sign(value, "pass");
console.log(token);

