import { assert, UnitTest } from '@ephox/bedrock-client';

import * as SandHTMLElement from 'ephox/sand/api/SandHTMLElement';

UnitTest.test('HtmlElementTest', () => {
  const span = document.createElement('div');
  assert.eq(false, SandHTMLElement.isPrototypeOf(null));
  assert.eq(false, SandHTMLElement.isPrototypeOf(undefined));
  assert.eq(false, SandHTMLElement.isPrototypeOf('a string'));
  assert.eq(false, SandHTMLElement.isPrototypeOf({}));
  assert.eq(true, SandHTMLElement.isPrototypeOf(span));
});
