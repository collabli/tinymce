import { FieldSchema, StructureSchema } from '@ephox/boulder';
import { Result, Fun } from '@ephox/katamari';

export interface FancyMenuItemSpec {
  type: 'fancymenuitem';
  fancytype: string;
  onAction: (data: any) => void;
}

export interface FancyMenuItem {
  type: 'fancymenuitem';
  fancytype: keyof FancyActionArgsMap;
  onAction: <K extends keyof FancyActionArgsMap>(data: FancyActionArgsMap[K]) => void;
}

export interface FancyActionArgsMap {
  'inserttable': { numRows: Number; numColumns: Number };
  'colorswatch': { value: string };
}

const fancyTypes: (keyof FancyActionArgsMap)[] = [ 'inserttable', 'colorswatch' ]; // These will need to match the keys of FancyActionArgsMap above

export const fancyMenuItemSchema = StructureSchema.objOf([
  FieldSchema.requiredString('type'),
  FieldSchema.requiredStringEnum('fancytype', fancyTypes),
  FieldSchema.defaultedFunction('onAction', Fun.noop)
]);

export const createFancyMenuItem = (spec: FancyMenuItemSpec): Result<FancyMenuItem, StructureSchema.SchemaError<any>> =>
  StructureSchema.asRaw('fancymenuitem', fancyMenuItemSchema, spec);
