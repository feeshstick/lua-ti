import {CommentContainer} from "../components/nodes/trivia/comment-trivia-container.js";
import pegjs, {Parser} from "pegjs";
import fs from "fs";
import {TypeKind} from "../type/type.js";
import {
    Annotation,
    AnnotationKind,
    ClassAnnotation, ConstructorAnnotation,
    DescriptionAnnotation,
    NameAnnotation,
    SignatureAnnotation
} from "./annotation.js";

export class AnnotationParser {
    private readonly parser: Parser
    
    constructor() {
        let source = fs.readFileSync('parser-assets/annotation-grammar').toString('utf-8')
        source = source.replace(/AnnotationKind\.\w+/gm, f => {
            return AnnotationKind[f.split('.')[1]]
        }).replace(/TypeKind\.\w+/gm, f => {
            return TypeKind[f.split('.')[1]]
        })
        
        this.parser = pegjs.generate(source, {
            allowedStartRules: ['start'],
            optimize: 'speed',
        })
    }
    
    parse(comments: CommentContainer[]): ClassAnnotation | SignatureAnnotation | undefined {
        const annotations: Annotation[] = []
        for (let comment of comments) {
            const text = comment.node.raw
            if (text.startsWith('---@')) {
                try {
                    annotations.push(...this.parser.parse(text.trim()).list)
                } catch (e) {
                    // @ts-ignore
                    console.log(text, e)
                }
            }
        }
        let classAnnotation: ClassAnnotation | undefined = undefined
        let signatureAnnotation: SignatureAnnotation | undefined = undefined
        let nameAnnotation: NameAnnotation | undefined = undefined
        let descriptionAnnotation: DescriptionAnnotation | undefined = undefined
        let constructorAnnotation: ConstructorAnnotation | undefined = undefined
        for (let i = 0; i < annotations.length; i++) {
            let annotation = annotations[i];
            switch (annotation.kind) {
                case AnnotationKind.Constructor:
                    constructorAnnotation = annotation
                    break;
                case AnnotationKind.See:
                    break;
                case AnnotationKind.Parameter:
                    if (!signatureAnnotation) {
                        if (classAnnotation) {
                            throw new Error()
                        } else {
                            signatureAnnotation = {
                                description: descriptionAnnotation,
                                name: nameAnnotation,
                                kind: AnnotationKind.Signature,
                                _constructor:constructorAnnotation,
                                returns: {
                                    kind: AnnotationKind.Return,
                                    type: {
                                        kind: TypeKind.Any
                                    }
                                },
                                parameter: [annotation]
                            }
                        }
                    } else {
                        signatureAnnotation.parameter.push(annotation)
                    }
                    break;
                case AnnotationKind.Field:
                    if (classAnnotation) {
                        classAnnotation.fields.push(annotation)
                    } else {
                        throw new Error()
                    }
                    break;
                case AnnotationKind.Alias:
                    break;
                case AnnotationKind.Return:
                    if (!signatureAnnotation) {
                        if (classAnnotation) {
                            throw new Error()
                        } else {
                            signatureAnnotation = {
                                description: descriptionAnnotation,
                                _constructor:constructorAnnotation,
                                name: nameAnnotation,
                                kind: AnnotationKind.Signature,
                                returns: annotation,
                                parameter: []
                            }
                        }
                    } else {
                        signatureAnnotation.returns = annotation
                    }
                    break;
                case AnnotationKind.Description:
                    descriptionAnnotation = annotation
                    break;
                case AnnotationKind.Class:
                    classAnnotation = annotation
                    break;
                case AnnotationKind.Name:
                    nameAnnotation = annotation
                    break;
            }
        }
        if (signatureAnnotation) {
            signatureAnnotation.name = nameAnnotation
            signatureAnnotation.description = descriptionAnnotation
            signatureAnnotation._constructor = constructorAnnotation
        }
        if (classAnnotation) {
            classAnnotation.description = descriptionAnnotation
        }
        return signatureAnnotation || classAnnotation
    }
}
