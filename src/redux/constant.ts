/**
 * - Sử dụng SKIP_TOKEN để ngừng hook request api mà ko cần truyền undefined,false
 * @example
 * ```
 * ❌useGetData(undefined,false)
 * ✅useGetData(SKIP_TOKEN)
 * ```
 */
export const SKIP_TOKEN = 'SKIP_TOKEN' as any;
