export interface ConnectionDatabase {
    open: () => Promise<void>
    close: () => Promise<void>
}
