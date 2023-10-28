export function combineHeaders(...headers: Array<ResponseInit['headers'] | null | undefined>) {
  const combinedHeader = new Headers();

  for (const header of headers) {
    if (!header) {
      continue;
    }

    for (const [key, value] of new Headers(header).entries()) {
      combinedHeader.append(key, value);
    }
  }

  return combinedHeader;
}
