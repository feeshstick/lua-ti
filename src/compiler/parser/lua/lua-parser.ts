import {Program} from "../../components/nodes/meta/program.js";

import luaparse, {Node} from "luaparse"
import {Comment} from "luaparse/lib/ast.js";
import {ChunkContainer, ChunkContext} from "../../components/nodes/meta/chunk-container.js";
import fs from "fs";

export function parse(
    program: Program,
    chunkContext: Omit<ChunkContext, 'source'>
) {
    const source = fs.readFileSync(chunkContext.path + '/' + chunkContext.file).toString('utf-8')
    const commentGroups: Comment[][] = []
    let previousType: Node['type'] | undefined
    
    function getCommentMatch(line: number) {
        for (let commentGroup of commentGroups) {
            const commentEnd = commentGroup[commentGroup.length - 1].loc?.start.line
            if (commentEnd === line - 1) {
                return commentGroup
            }
        }
        return undefined
    }
    
    const abstractSyntaxTree = luaparse.parse(source, {
        locations: true,
        ranges: true,
        luaVersion: "5.3",
        scope: true,
        comments: true,
        onCreateNode: onCreateNode
    })
    
    function onCreateNode(node: Node) {
        if (node.type === 'Comment') {
            const match = getCommentMatch(node.loc!.start.line)
            if (match) {
                match.push(node)
            } else {
                commentGroups.push([node])
            }
        }
        previousType = node.type
        if (node.type === 'FunctionDeclaration') {
            const line = node.loc!.start.line
            node['comments'] = getCommentMatch(line)
        } else if (node.type === 'AssignmentStatement') {
            const line = node.loc!.start.line
            node['comments'] = getCommentMatch(line)
        }
    }
    
    return new ChunkContainer({
        ...chunkContext,
        ...{
            source: source
        }
    }, abstractSyntaxTree, program, program.scope)
}