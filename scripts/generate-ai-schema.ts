/**
 * Generates a static JSON schema for AI block generation.
 * This runs outside of Next.js, so "use client" directives don't cause RSC boundary issues.
 *
 * Usage: npx tsx -r tsconfig-paths/register scripts/generate-ai-schema.ts
 */

import { config } from "@/lib/puck-config";
import * as fs from "fs";
import * as path from "path";

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

function extractBlockSchemas(): BlockSchema[] {
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

const schemas = extractBlockSchemas();
const outputPath = path.join(__dirname, "../src/lib/ai/generated-schema.json");
fs.writeFileSync(outputPath, JSON.stringify(schemas, null, 2));
console.log(`Generated AI schema with ${schemas.length} blocks → ${outputPath}`);
