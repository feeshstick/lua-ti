import {IdentifierContainer} from "./literal/identifier-container.js";
import {MemberExpressionContainer} from "./member-expression-container.js";
import {IndexExpressionContainer} from "./index-expression-container.js";

export type VariableContainer = IdentifierContainer | MemberExpressionContainer | IndexExpressionContainer