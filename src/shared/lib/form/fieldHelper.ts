/** Reserves space for helper text so the layout doesn't shift when an error appears. */
export function fieldHelper(message?: string): string {
    return message ?? "\u00A0";
}
