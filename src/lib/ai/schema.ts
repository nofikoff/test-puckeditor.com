import { config } from "@/lib/puck-config";

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

function extractFieldSchema(field: Record<string, unknown>): FieldSchema {
  const schema: FieldSchema = {
    type: field.type as string,
  };

  if (field.options) {
    schema.options = field.options as Array<{ label: string; value: string }>;
  }

  if (field.arrayFields) {
    schema.arrayFields = {};
    for (const [key, subField] of Object.entries(
      field.arrayFields as Record<string, Record<string, unknown>>
    )) {
      schema.arrayFields[key] = extractFieldSchema(subField);
    }
  }

  if (field.objectFields) {
    schema.objectFields = {};
    for (const [key, subField] of Object.entries(
      field.objectFields as Record<string, Record<string, unknown>>
    )) {
      schema.objectFields[key] = extractFieldSchema(subField);
    }
  }

  return schema;
}

export function extractBlockSchemas(): BlockSchema[] {
  const schemas: BlockSchema[] = [];

  for (const [name, component] of Object.entries(config.components)) {
    const comp = component as {
      label?: string;
      fields?: Record<string, Record<string, unknown>>;
      defaultProps?: Record<string, unknown>;
    };

    const fields: Record<string, FieldSchema> = {};
    if (comp.fields) {
      for (const [fieldName, field] of Object.entries(comp.fields)) {
        // Skip custom fields (like RichTextField) — AI cannot fill them reliably
        if (field.type === "custom") continue;
        fields[fieldName] = extractFieldSchema(field);
      }
    }

    schemas.push({
      type: name,
      label: comp.label || name,
      fields,
      defaultProps: (comp.defaultProps || {}) as Record<string, unknown>,
    });
  }

  return schemas;
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
