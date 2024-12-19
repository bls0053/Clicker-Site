
export async function loadCode(filePath: string) {
    const response = await fetch(filePath);
    return await response.text();
}
