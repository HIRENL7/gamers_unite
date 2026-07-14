import type { FieldErrors, Resolver } from "react-hook-form";
import type { z } from "zod";

function getPathKey(path: PropertyKey[]) {
  return path.join(".");
}

export function zodResolver<TSchema extends z.ZodType>(
  schema: TSchema
): Resolver<z.input<TSchema>, unknown, z.output<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors = result.error.issues.reduce<
      Record<string, { message: string; type: string }>
    >((errors, issue) => {
      errors[getPathKey(issue.path)] = {
        message: issue.message,
        type: issue.code,
      };

      return errors;
    }, {});

    return {
      values: {},
      errors: errors as FieldErrors<z.input<TSchema>>,
    };
  };
}
