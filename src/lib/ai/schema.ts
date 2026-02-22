import generatedSchemas from "./generated-schema.json";

type FieldSchema = {
  type: string;
  options?: Array<{ label: string; value: string }>;
  arrayFields?: Record<string, FieldSchema>;
  objectFields?: Record<string, FieldSchema>;
};

type BlockSchema = {
  type: string;
  label: string;
  fields: Record<string, FieldSchema>;
  defaultProps: Record<string, unknown>;
};

export function extractBlockSchemas(): BlockSchema[] {
  return generatedSchemas as BlockSchema[];
}

export function buildBlockSchemaPrompt(): string {
  const schemas = extractBlockSchemas();
  const lines: string[] = [];

  for (const block of schemas) {
    lines.push(`### ${block.type} (${block.label})`);
    lines.push("Fields:");

    for (const [fieldName, field] of Object.entries(block.fields)) {
      let desc = `  - ${fieldName}: ${field.type}`;
      if (field.options) {
        desc += ` [${field.options.map((o) => o.value).join(", ")}]`;
      }
      if (field.arrayFields) {
        const subFields = Object.entries(field.arrayFields)
          .map(([k, v]) => `${k}:${v.type}`)
          .join(", ");
        desc += ` (array of {${subFields}})`;
      }
      if (field.objectFields) {
        const subFields = Object.entries(field.objectFields)
          .map(([k, v]) => `${k}:${v.type}`)
          .join(", ");
        desc += ` (object {${subFields}})`;
      }
      lines.push(desc);
    }

    lines.push("");
  }

  return lines.join("\n");
}
