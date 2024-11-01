import fs from 'fs';
import path from 'path';

// 获取 index.ts 文件的路径
const indexFilePath = path.resolve('./src/apis', 'index.ts'); // 根据实际路径调整
// 读取 index.ts 文件内容
const indexFileContent = fs.readFileSync(indexFilePath, 'utf-8');
// 去除 index.ts 中的重复导出
const uniqueIndexContent = indexFileContent
  .split('\n')
  .filter((line, index, self) => self.indexOf(line) === index)
  .join('\n');
// 写回 index.ts 文件
fs.writeFileSync(indexFilePath, uniqueIndexContent);
console.log('Removed duplicate exports from index.ts');

// 获取 OpenAPI.ts 文件的路径
const openAPIFilePath = path.resolve('./src/apis/core', 'OpenAPI.ts'); // 根据实际路径调整
// 获取新的 OpenAPI 内容的文件路径
const newOpenAPIFilePath = path.resolve('./src/apis/customCore', 'OpenAPI.ts'); // 根据实际路径调整
// 读取新的 OpenAPI 内容
const newOpenAPIFileContent = fs.readFileSync(newOpenAPIFilePath, 'utf-8');
// 替换 OpenAPI.ts 文件内容
fs.writeFileSync(openAPIFilePath, newOpenAPIFileContent);
console.log('Replaced content in OpenAPI.ts with content from custom OpenAPI.ts');

// 获取 request.ts 文件的路径
const requestFilePath = path.resolve('./src/apis/core', 'request.ts'); // 根据实际路径调整
// 获取新的 request 内容的文件路径
const newrequestFilePath = path.resolve('./src/apis/customCore', 'request.custom.ts'); // 根据实际路径调整
// 读取新的 OpenAPI 内容
const newrequestFileContent = fs.readFileSync(newrequestFilePath, 'utf-8');
// 替换 request.ts 文件内容
fs.writeFileSync(requestFilePath, newrequestFileContent);
console.log('Replaced content in request.ts with content from custom request.ts');
