// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ShoppingCart {
    struct CartItem {
        string title;
        string price;
        string imageUrl;
    }

    mapping(address => CartItem[]) public userCart;

    event ItemAdded(address indexed user, string title, string price, string imageUrl);
    event ItemRemoved(address indexed user, string title, string price, string imageUrl);

    function addItem(string memory _title, string memory _price, string memory _imageUrl) public {
        CartItem memory newItem = CartItem(_title, _price, _imageUrl);
        userCart[msg.sender].push(newItem);
        emit ItemAdded(msg.sender, _title, _price, _imageUrl);
    }

    function removeItem(uint256 _index) public {
        require(_index < userCart[msg.sender].length, "Invalid index");

        string memory removedTitle = userCart[msg.sender][_index].title;
        string memory removedPrice = userCart[msg.sender][_index].price;
        string memory removedImageUrl = userCart[msg.sender][_index].imageUrl;

        delete userCart[msg.sender][_index];

        for (uint256 i = _index; i < userCart[msg.sender].length - 1; i++) {
            userCart[msg.sender][i] = userCart[msg.sender][i + 1];
        }
        userCart[msg.sender].pop();

        emit ItemRemoved(msg.sender, removedTitle, removedPrice, removedImageUrl);
    }

    function getCartItemCount() public view returns (uint256) {
        return userCart[msg.sender].length;
    }
}
