export const timeout = (ms: number) => new Promise((resolve: () => void, reject: () => void) => setTimeout(resolve, ms))
