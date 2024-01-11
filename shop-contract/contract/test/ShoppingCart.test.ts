const { expect } = require('chai');
const { ethers } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');

describe('ShoppingCart', function () {
    let acc1;
    let shoppingCart;

    async function deploy() {
        const acc1 = await ethers.getSigners();
        const ShoppingCart = await ethers.getContractFactory('ShoppingCart', acc1);
        const shoppingCart = await ShoppingCart.deploy();
        await shoppingCart.waitForDeployment();

        return { acc1, shoppingCart };
    }

    it('should be deployed', async function () {
        await loadFixture(deploy);
        console.log('success!');
    });

    it('should add an item to the cart and remove it', async function () {
        const { shoppingCart } = await loadFixture(deploy);
        acc1 = await ethers.getSigners();

        const newItemTitle = 'кроссовки';
        const newItemPrice = '1';
        const newItemImageUrl = '/items/sneakers1.jpg';

        await shoppingCart.addItem(newItemTitle, newItemPrice, newItemImageUrl);   
        console.log('item is added')

        const itemCountAfterAdd = await shoppingCart.getCartItemCount();
        expect(itemCountAfterAdd).to.equal(1);

        await shoppingCart.removeItem(0);
        console.log('item is removed')

        const itemCountAfterRemove = await shoppingCart.getCartItemCount();
        expect(itemCountAfterRemove).to.equal(0);
    });
});
