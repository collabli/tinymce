import { Option, Options } from '@ephox/katamari';
import { Attr, Element, Position } from '@ephox/sugar';

import { AlloyComponent } from '../../api/component/ComponentApi';
import { SnapsConfig } from '../common/DraggingTypes';

const parseAttrToInt = (element: Element, name: string) =>
  Attr.getOpt(element, name).map((value) => parseInt(value, 10)).filter((value) => !isNaN(value));

// NOTE: Moved from ego with some parameterisation
const get = <E>(component: AlloyComponent, snapsInfo: SnapsConfig<E>): Option<Position> => {
  const element = component.element();
  const x = parseAttrToInt(element, snapsInfo.leftAttr);
  const y = parseAttrToInt(element, snapsInfo.topAttr);
  return Options.lift2(x, y, Position);
};

const set = <E>(component: AlloyComponent, snapsInfo: SnapsConfig<E>, pt: Position): void => {
  const element = component.element();
  Attr.set(element, snapsInfo.leftAttr, pt.left() + 'px');
  Attr.set(element, snapsInfo.topAttr, pt.top() + 'px');
};

const clear = <E>(component: AlloyComponent, snapsInfo: SnapsConfig<E>): void => {
  const element = component.element();
  Attr.remove(element, snapsInfo.leftAttr);
  Attr.remove(element, snapsInfo.topAttr);
};

export {
  get,
  set,
  clear
};
