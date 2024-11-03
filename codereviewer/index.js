#!/usr/bin/env node
import chalk from 'chalk';
import { ChatOllama } from '@langchain/ollama';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const model = new ChatOllama({
  model: 'llama3.2',
});

const filePath = path.join(__dirname, 'test.ts');
const code = fs.readFileSync(filePath, 'utf-8');

const reviewPrompt = `Act as an expert software engineer and review the following code for best practices, software architecture, code security and overall design of the app:\n\n${code}`;

const result = await model.invoke(['human', chalk.red(reviewPrompt)]);

console.log(chalk.red(result.content));
