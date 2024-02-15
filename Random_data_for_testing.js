const Chance = require("chance");
const chance = new Chance();
const test_data = [];
for (let i = 0; i < 10; i++) {
    const password = chance.string({ length: 10, alpha: true, numeric: true });

    test_data.push({
        name: chance.string({ length: 5, numeric: false }),
        password: password,
        confirmPassword: password,  
        state: chance.string({ length: 5 }),
        number: chance.integer({min:1000000000,max:9999999999})
    });
}

console.log(test_data);
