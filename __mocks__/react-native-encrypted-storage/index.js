const RNEncryptedStorage = {
    setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() =>
        Promise.resolve(
            "[{id: 1, key: '1', title: 'title note', content: 'content note'}]",
        ),
    ),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
};

export default RNEncryptedStorage;
