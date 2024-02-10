import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  let account: BankAccount;
  beforeEach(() => (account = getBankAccount(100)));

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(101)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(101, getBankAccount(1000))).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(1, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(1).getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    expect(account.withdraw(1).getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    const transferAmount = 1;
    const recipientInitialBalance = 1000;
    const recipient = getBankAccount(recipientInitialBalance);
    expect(account.transfer(transferAmount, recipient).getBalance()).toBe(
      recipient.getBalance() -
        recipientInitialBalance -
        transferAmount +
        account.getBalance(),
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    expect.assertions(1);
    const mockBalance = 1000;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockBalance);
    await expect(account.fetchBalance()).resolves.toBe(mockBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    expect.assertions(1);
    const mockBalance = 1000;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    expect.assertions(1);
    const mockBalance = null;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockBalance);
    await expect(() => account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
