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
exports.SNTestEnvironment = void 0;
exports.initSNTestEnvironment = initSNTestEnvironment;
const path = __importStar(require("path"));
const console_1 = require("console");
const fs = __importStar(require("fs"));
function initSNTestEnvironment(glideDeclarationUseRoot = true, glideDeclarationPath = '@types/servicenow', glideDeclarationFileName = 'glide.server.d.ts') {
    SNTestEnvironment.getInstance().init(glideDeclarationUseRoot, glideDeclarationPath, glideDeclarationFileName);
}
class SNTestEnvironment {
    constructor() {
        this.glideDeclarationUseRoot = true;
        this.glideDeclarationPath = '@types/servicenow';
        this.glideDeclarationFileName = 'glide.server.d.ts';
        this.modulePath = "";
        // Private constructor to prevent instantiation
    }
    static getInstance() {
        if (!SNTestEnvironment.instance) {
            SNTestEnvironment.instance = new SNTestEnvironment();
        }
        return SNTestEnvironment.instance;
    }
    init(glideDeclarationUseRoot = true, glideDeclarationPath = '@types/servicenow', glideDeclarationFileName = 'glide.server.d.ts') {
        this.glideDeclarationUseRoot = glideDeclarationUseRoot;
        this.glideDeclarationPath = glideDeclarationPath;
        this.glideDeclarationFileName = glideDeclarationFileName;
        this.modulePath = "";
        if (glideDeclarationUseRoot) {
            const rootDir = this.getAppRootDir(); //path.dirname(require.main.filename);
            (0, console_1.log)(`Root dir: ${rootDir}`);
            (0, console_1.log)(`Glide declaration path: ${this.glideDeclarationPath}`);
            (0, console_1.log)(`Glide declaration file name: ${this.glideDeclarationFileName}`);
            this.modulePath = path.resolve(rootDir, this.glideDeclarationPath, this.glideDeclarationFileName);
        }
        else {
            this.modulePath = path.resolve(this.glideDeclarationPath, this.glideDeclarationFileName);
        }
    }
    getAppRootDir() {
        const { dirname } = require('path');
        const appDir = dirname(require.main.filename);
        let currentDir = appDir;
        while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
            currentDir = path.join(currentDir, '..');
        }
        return currentDir;
    }
}
exports.SNTestEnvironment = SNTestEnvironment;
//# sourceMappingURL=SNTestEnvironment.js.map