export function flatStrapiResponse(response: any) {
  if (typeof response !== "object") {
    return response;
  }

  const { attributes, id } = response;
  const result: Record<string, any> = { id };

  if (!attributes) {
    return result;
  }

  for (const key in attributes) {
    const value = attributes[key];
    if (value && typeof value === "object" && "data" in value) {
      result[key] = flatStrapiResponse(value.data);
    } else {
      result[key] = value;
    }
  }

  return result;
}
