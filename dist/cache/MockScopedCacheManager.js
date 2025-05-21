"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockScopedCacheManager = void 0;
class MockScopedCacheManager {
    static flushScopedCache(catalog, key) {
        if (key) {
            if (MockScopedCacheManager.cache[catalog]) {
                delete MockScopedCacheManager.cache[catalog][key];
            }
        }
        else {
            delete MockScopedCacheManager.cache[catalog];
        }
    }
    static get(catalog, key) {
        return MockScopedCacheManager.cache[catalog]?.[key] || null;
    }
    static getCacheEntryDetails(catalog, key) {
        const value = MockScopedCacheManager.get(catalog, key);
        if (value) {
            return `java.lang.String (${value.length}): ${value}`;
        }
        return 'null';
    }
    static prefixFlush(catalog, prefix) {
        if (MockScopedCacheManager.cache[catalog]) {
            for (const key in MockScopedCacheManager.cache[catalog]) {
                if (key.startsWith(prefix)) {
                    delete MockScopedCacheManager.cache[catalog][key];
                }
            }
        }
    }
    static put(catalog, key, value) {
        if (!MockScopedCacheManager.cache[catalog]) {
            MockScopedCacheManager.cache[catalog] = {};
        }
        MockScopedCacheManager.cache[catalog][key] = value;
    }
    static putMultiRow(catalog, key, value, ids) {
        MockScopedCacheManager.put(catalog, key, value);
        // For simplicity, we are not tracking the ids in this mock implementation
    }
    static putRow(catalog, key, value, sysId) {
        MockScopedCacheManager.put(catalog, key, value);
        // For simplicity, we are not tracking the sysId in this mock implementation
    }
}
exports.MockScopedCacheManager = MockScopedCacheManager;
MockScopedCacheManager.cache = {};
//USAGE:
//   // Mocking the ScopedCacheManager in the test environment
//   jest.mock('@servicenow/glide/sn_scoped_cache', () => ({
//     ScopedCacheManager: MockScopedCacheManager
//   }));
//# sourceMappingURL=MockScopedCacheManager.js.map