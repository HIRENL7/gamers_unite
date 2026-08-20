import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

function getPathKey(path: PropertyKey[]) {
  return path.join(".");
}

export function zodResolver<Input extends FieldValues, Output = Input>(
  schema: z.ZodType<Output, Input>
): Resolver<Input, unknown, Output> {
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
      values: {} as Record<string, never>,
      errors: errors as FieldErrors<Input>,
    };
  };
}
