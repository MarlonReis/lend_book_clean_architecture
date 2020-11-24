export interface ConnectionDatabase {
    open: (url: string) => Promise<void>
    close: () => Promise<void>
}
