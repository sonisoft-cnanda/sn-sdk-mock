"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlideRecordDBInit = void 0;
const ts = __importStar(require("typescript"));
const fs = __importStar(require("fs"));
class GlideRecordDBInit {
    constructor(tableName, modulePath = "") {
        this.tableName = "";
        this.modulePath = "";
        this.tableProperties = new Map();
        this.tableName = tableName;
        this.modulePath = modulePath;
    }
    getTableInterfaceFromModule() {
        const program = ts.createProgram([this.modulePath], { allowJs: true });
        const sourceFile = program.getSourceFile(this.modulePath);
        const typeChecker = program.getTypeChecker();
        // const sourceFile = this.getSourceFile(this.modulePath);
        this.traverse(sourceFile);
        if (this.tableInterfaceNode) {
            const properties = this.getAllInterfaceProperties(this.tableInterfaceNode, typeChecker);
            //console.log(`Interface ${this.tableInterfaceNode.name.text} properties:`);
            // properties.forEach((property, name) => {
            //     //console.log(`  - ${name}: ${typeChecker.typeToString(typeChecker.getTypeAtLocation(property))}`);
            //     console.log(`  - ${name}`);
            // });
            this.tableProperties = properties;
            // const properties = this.getInterfaceProperties(this.tableInterfaceNode);
            // console.log('Properties of interface', this.tableName, ':', properties);
        }
        else {
            console.log('Interface not found');
        }
    }
    static async initializeGlideRecordDBTypes(modulePath, interfaceName) {
        let dbInit = new GlideRecordDBInit(interfaceName, modulePath);
        dbInit.getTableInterfaceFromModule();
    }
    getInterfaceProperties(node) {
        let properties = [];
        function visit(node) {
            if (ts.isInterfaceDeclaration(node)) {
                let interfaceNode = node;
                interfaceNode.members.forEach(member => {
                    if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
                        properties.push(member.name.text);
                    }
                });
            }
        }
        visit(node);
        return properties;
    }
    traverse(node) {
        switch (node.kind) {
            case ts.SyntaxKind.InterfaceDeclaration:
                const interfaceNode = node;
                //console.log('Interface:', interfaceNode.name.text);
                if (interfaceNode.name.text === this.tableName) {
                    this.tableInterfaceNode = interfaceNode;
                    console.log('Found table name:', interfaceNode.name.text);
                }
                // Process interface members
                break;
            // case ts.SyntaxKind.ClassDeclaration:
            //   const classNode = node as ts.ClassDeclaration;
            //   console.log('Class:', classNode.name.text);
            //   // Process class members
            //   break;
            // Handle other node types as needed
        }
        ts.forEachChild(node, (childNode) => {
            // this refers to an instance of MyClass
            this.traverse(childNode);
        });
    }
    static async importInterface(modulePath, exportName) {
        const module = await import(modulePath);
        return module[exportName];
    }
    getSourceFile(modulePath) {
        const sourceFile = ts.createSourceFile(modulePath, fs.readFileSync(modulePath, 'utf-8'), ts.ScriptTarget.Latest, true);
        return sourceFile;
    }
    processFile(filePath) {
        const program = ts.createProgram([filePath], { allowJs: true });
        const sourceFile = program.getSourceFile(filePath);
        const typeChecker = program.getTypeChecker();
        if (sourceFile) {
            ts.forEachChild(sourceFile, (node) => {
                if (ts.isInterfaceDeclaration(node)) {
                    const properties = this.getAllInterfaceProperties(node, typeChecker);
                    console.log(`Interface ${node.name.text} properties:`);
                    properties.forEach((property, name) => {
                        console.log(`  - ${name}: ${typeChecker.typeToString(typeChecker.getTypeAtLocation(property))}`);
                    });
                }
            });
        }
    }
    getAllInterfaceProperties(node, typeChecker, properties = new Map()) {
        // Add properties of current interface
        node.members.forEach((member) => {
            if (ts.isPropertySignature(member) && member.name) {
                properties.set(member.name.getText(), member);
            }
        });
        // Get base types (heritage clauses)
        const heritageClauses = node.heritageClauses;
        if (heritageClauses) {
            heritageClauses.forEach((clause) => {
                if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                    clause.types.forEach((type) => {
                        const symbol = typeChecker.getSymbolAtLocation(type.expression);
                        if (symbol && symbol.declarations) {
                            symbol.declarations.forEach((declaration) => {
                                if (ts.isInterfaceDeclaration(declaration)) {
                                    // Recursively get properties from base interface
                                    this.getAllInterfaceProperties(declaration, typeChecker, properties);
                                }
                            });
                        }
                    });
                }
            });
        }
        return properties;
    }
}
exports.GlideRecordDBInit = GlideRecordDBInit;
//# sourceMappingURL=GlideRecordDBInit.js.map