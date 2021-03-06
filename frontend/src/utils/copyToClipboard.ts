export async function clipboardCopy(text: string) {
  let success = false;

  if (typeof window !== "undefined") {
    // Use the Async Clipboard API when available. Requires a secure browsing
    // context (i.e. HTTPS)
    if (navigator.clipboard) {
      try {
        return navigator.clipboard.writeText(text);
      } catch (err) {
        throw err !== undefined
          ? err
          : new DOMException("The request is not allowed", "NotAllowedError");
      }
    }

    // ...Otherwise, use document.execCommand() fallback

    // Put the text to copy into a <span>
    const span = document.createElement("span");
    span.textContent = text;

    // Preserve consecutive spaces and newlines
    span.style.whiteSpace = "pre";

    // Add the <span> to the page
    document.body.appendChild(span);

    // Make a selection object representing the range of text selected by the user
    const selection = window.getSelection();
    const range = window.document.createRange();

    if (selection) {
      selection.removeAllRanges();
      range.selectNode(span);
      selection.addRange(range);

      // Copy text to the clipboard
      try {
        success = window.document.execCommand("copy");
      } catch (err) {
        console.error(err);
      }

      // Cleanup
      selection.removeAllRanges();
      window.document.body.removeChild(span);
    }
  }

  return success
    ? Promise.resolve()
    : Promise.reject(
        new DOMException("The request is not allowed", "NotAllowedError")
      );
}
