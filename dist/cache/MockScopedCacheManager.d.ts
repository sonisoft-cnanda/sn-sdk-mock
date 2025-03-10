export declare class MockScopedCacheManager {
    private static cache;
    static flushScopedCache(catalog: string, key?: string): void;
    static get(catalog: string, key: string): string | null;
    static getCacheEntryDetails(catalog: string, key: string): string;
    static prefixFlush(catalog: string, prefix: string): void;
    static put(catalog: string, key: string, value: string): void;
    static putMultiRow(catalog: string, key: string, value: string, ids: string[]): void;
    static putRow(catalog: string, key: string, value: string, sysId?: string): void;
}
//# sourceMappingURL=MockScopedCacheManager.d.ts.map