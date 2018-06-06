import MemoryStorage from 'redux-persist-memory-storage'

// Replace default storage with MemoryStorage to avoid warnings during tests
module.exports = new MemoryStorage()
