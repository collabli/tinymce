/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import { Fun, Optional } from '@ephox/katamari';
import { SugarElement, SugarNode } from '@ephox/sugar';

import Editor from '../api/Editor';
import * as CaretFinder from '../caret/CaretFinder';
import * as NodeType from '../dom/NodeType';

const findFirstCaretElement = (editor: Editor): Optional<Node> =>
  CaretFinder.firstPositionIn(editor.getBody())
    .map((caret) => {
      const container = caret.container();
      return NodeType.isText(container) ? container.parentNode : container;
    });

const getCaretElement = (editor: Editor): Optional<Node> =>
  Optional.from(editor.selection.getRng())
    .bind((rng) => {
      const root = editor.getBody();
      const atStartOfNode = rng.startContainer === root && rng.startOffset === 0;
      return atStartOfNode ? Optional.none() : Optional.from(editor.selection.getStart(true));
    });

export const mapRange = <T>(editor: Editor, mapper: (node: SugarElement<Element>) => T): Optional<T> =>
  getCaretElement(editor)
    .orThunk(Fun.curry(findFirstCaretElement, editor))
    .map(SugarElement.fromDom)
    .filter(SugarNode.isElement)
    .map(mapper);
