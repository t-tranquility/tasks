let order =0;
function cookPizza(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             const success = Math.random() < 0.8; 
            if (success) {
                resolve(`Order ${order}: Your pizza is ready`);
            } else {
                reject(new Error('Pizza preparation failed')); 
            }
        }, 6000);
    });
}
function brewCoffee(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.7;  
            if (success) {
                resolve(`Order ${order}: Your coffe is ready`);
            } else {
                reject(new Error('Coffe preparation failed')); 
            }
        }, 2000);
    });
}

function bakingBread(order) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.5;  
            if (success) {
                resolve(`Order ${order}: Your bread is ready`);
            } else {
                reject(new Error('Bread preparation failed')); 
            }
        }, 4000);
    });
}

async function processOrder(order) {

    console.log('Start processing the order...');

    try {
        const pizzaResult = await cookPizza(order);
        console.log(pizzaResult);

        const coffeeResult = await brewCoffee(order);
        console.log(coffeeResult);

        const breadResult = await bakingBread(order);
        console.log(breadResult);

        return 'Order is ready!';
    } catch (error) {
        throw error; 
    }
}

async function multipleOrders() {
    const orderPromises = [];
    for (let i = 1; i <= 3; i++) {
        order++; 
        orderPromises.push(processOrder(order));
    }

    try {
        const results = await Promise.allSettled(orderPromises);
        console.log('All orders are ready:', results);
    } catch (error) {
        console.error('Error during order processing:', error);
    }
}

multipleOrders() 
  .then(result => console.log(result))
  .catch(error => console.log(error))