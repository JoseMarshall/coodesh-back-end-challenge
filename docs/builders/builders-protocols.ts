interface GeneralSchemaData<T> {
  description?: string;
  example?: T;
}

interface MakeStringSchemaData extends GeneralSchemaData<string> {
  enum?: ReadonlyArray<string>;
  format?:
    | 'int32'
    | 'int64'
    | 'float'
    | 'double'
    | 'byte'
    | 'binary'
    | 'date'
    | 'date-time'
    | 'uuid'
    | 'email'
    | 'password';
}

interface MakeStringSchemaReturn extends GeneralSchemaData<string> {
  enum?: ReadonlyArray<string>;
  type: 'string';
  format?: string;
}

export type MakeStringSchema = (data?: MakeStringSchemaData) => MakeStringSchemaReturn;

interface MakeArraySchemaData extends GeneralSchemaData<ReadonlyArray<unknown>> {
  minItems?: number;
  maxItems?: number;
  items: unknown;
}

interface MakeArraySchemaReturn extends GeneralSchemaData<ReadonlyArray<unknown>> {
  type: 'array';
  items: unknown;
  minItems?: number;
  maxItems?: number;
}

export type MakeArraySchema = (data: MakeArraySchemaData) => MakeArraySchemaReturn;

interface MakeObjectSchemaData extends GeneralSchemaData<Record<string, unknown>> {
  properties: Record<string, unknown>;
  required?: ReadonlyArray<string>;
}

interface MakeObjectSchemaReturn extends GeneralSchemaData<Record<string, unknown>> {
  properties: Record<string, unknown>;
  required?: ReadonlyArray<string>;
  type: 'object';
}

export type MakeObjectSchema = (data: MakeObjectSchemaData) => MakeObjectSchemaReturn;

interface MakeResponseSchemaReturn {
  properties: Record<string, unknown>;
  type: 'object';
}

export type MakeRequestBodySchema = (
  properties: Record<string, unknown>,
  required?: string[]
) => MakeResponseSchemaReturn;

export type MakeResponseBodySchema = (
  data: Record<string, unknown>,
  description?: string,
  requiredFields?: string[],
  omitCount?: boolean
) => MakeObjectSchemaReturn;

export type MakeGeneralResponseBodySchema = (
  data: Record<string, unknown>,
  requiredFields?: string[]
) => MakeObjectSchemaReturn;

interface MakeIntegerSchemaReturn extends GeneralSchemaData<number> {
  type: 'integer';
}

export type MakeIntegerSchema = (data: GeneralSchemaData<number>) => MakeIntegerSchemaReturn;

interface MakeParamSchemaData extends GeneralSchemaData<string> {
  name: string;
  required?: boolean;
  enum?: ReadonlyArray<string>;
  type: 'integer' | 'string' | 'number' | 'boolean' | 'array' | 'object';
  format?:
    | 'int32'
    | 'int64'
    | 'float'
    | 'double'
    | 'byte'
    | 'binary'
    | 'date'
    | 'date-time'
    | 'uuid'
    | 'email'
    | 'password';
}

interface MakeQueryParamSchemaReturn extends MakeParamSchemaData {
  in: 'query';
}

interface MakePathParamSchemaReturn extends MakeParamSchemaData {
  in: 'path';
}

export type MakeQueryParamSchema = (data: MakeParamSchemaData) => MakeQueryParamSchemaReturn;

export type MakePathParamSchema = (data: MakeParamSchemaData) => MakePathParamSchemaReturn;
