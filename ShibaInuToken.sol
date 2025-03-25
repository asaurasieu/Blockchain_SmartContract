// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShibaInuToken {
    // Token details
    string public constant name = "Shiba Inu";
    string public constant symbol = "SHIB";
    uint8 public constant decimals = 18;
    
    // Total supply is set to 20 tokens (considering 18 decimals: 20 * 10^18)
    uint256 private _totalSupply;
    
    // The owner is set as the deployer of the contract.
    address public owner;

    // Mappings for account balances and allowances
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // Events for transfer and approval actions
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Constructor: set deployer as owner and mint the initial supply to the owner.
    constructor() {
        owner = msg.sender;
        _totalSupply = 20 * (10 ** uint256(decimals)); // 20 tokens with 18 decimals
        _balances[owner] = _totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }

    /**
     * @notice Transfer tokens from the sender's account to a recipient.
     * @param recipient The address receiving the tokens.
     * @param amount The number of tokens to transfer.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(recipient != address(0), "Transfer to the zero address not allowed");
        require(_balances[msg.sender] >= amount, "Insufficient balance");

        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @notice Get the token balance of a specific account.
     * @param account The address to query.
     * @return The token balance of the account.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @notice Get the total supply of tokens.
     * @return The total number of tokens in circulation.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @notice Approve a third-party (spender) to spend a specified amount of tokens on behalf of the caller.
     * @param spender The address authorized to spend tokens.
     * @param amount The number of tokens allowed.
     * @return A boolean indicating whether the approval succeeded.
     */
    function approve(address spender, uint256 amount) public returns (bool) {
        require(spender != address(0), "Approve to the zero address not allowed");

        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /**
     * @notice Get the remaining amount of tokens that a spender is allowed to spend on behalf of an owner.
     * @param tokenOwner The owner of the tokens.
     * @param spender The authorized spender.
     * @return The remaining allowance.
     */
    function allowance(address tokenOwner, address spender) public view returns (uint256) {
        return _allowances[tokenOwner][spender];
    }
}
