export default function ErrorParser(errorMessage: string) {
  console.log("ERRORPARSER: ", errorMessage);
  const modelPattern = /Invalid `prisma\.(\w+).(\w+)\(\)` invocation:/;
  const modelRegex = new RegExp(modelPattern, "s"); // Consider using 's' if `.match()` is not capturing due to newlines
  const modelMatch = modelRegex.exec(errorMessage);
  if (modelMatch) {
    console.log("Extracted model:", modelMatch[1]);
  } else {
    // console.log("Model pattern not found. Regex:", modelRegex);
  }
  const fieldPattern = "Unique constraint failed on the fields: \\(`(.+?)`\\)";
  const fieldRegex = new RegExp(fieldPattern);
  const fieldMatch = fieldRegex.exec(errorMessage);
  if (fieldMatch) {
    console.log("Extracted field:", fieldMatch[1]);
  }
  if (fieldMatch || modelMatch) {
    return {
      field: fieldMatch ? fieldMatch[1] : null,
      model: modelMatch ? modelMatch[1] : null,
    };
  }
  return null;
}
