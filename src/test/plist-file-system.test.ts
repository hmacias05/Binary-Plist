import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as tmp from 'tmp';

import { PlistFileSystemProvider } from '../plist-file-system';

suite("Plist File System", () => {

    test('binary file read', () => {
        const plistFileSystem = new PlistFileSystemProvider;
        const filePath = path.resolve(__dirname, '../../src/test/fixtures/binary.plist');
        const stringArray = plistFileSystem.readFile(vscode.Uri.file(filePath));
        assert.equal(!!stringArray.length, true);
    });

    test('binary file write', async () => {
        const tmpobj = tmp.fileSync();
        const plistFileSystem = new PlistFileSystemProvider;
        const filePath = path.resolve(__dirname, '../../src/test/fixtures/binary.plist');
        const stringArray = plistFileSystem.readFile(vscode.Uri.file(filePath));
        await plistFileSystem.writeFile(vscode.Uri.file(tmpobj.name), stringArray, {create: true, overwrite: true});
        const fileStat = fs.statSync(tmpobj.name);
        assert.equal(fileStat.size, 42);
    });
});
