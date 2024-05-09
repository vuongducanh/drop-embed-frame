import { ELEMENT_TYPE } from "./common";

export interface ElementTypeData {
  id: string;
  elementType: ELEMENT_TYPE;
  props?: {
    text?: string;
    message?: string;
  }
}