export async function copyTextToClipboard(text: string): Promise<boolean> {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(text);

    return true;
  } else {
    return false;
  }
}
