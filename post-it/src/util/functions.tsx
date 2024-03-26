export function parseJson(json: string) {
  if (json !== undefined) return JSON.parse(json);
  else return JSON.parse("[]");
}

export function parseJsonUnd(json: string) {
  if (json !== undefined) return JSON.parse(json);
  else return undefined;
}

export function stringifyJson(json: string) {
  if (json !== undefined) return JSON.stringify(json);
  else return JSON.stringify("[]");
}

export function stringifyJsonUnd(json: string) {
  if (json !== undefined) return JSON.stringify(json);
  else return undefined;
}
