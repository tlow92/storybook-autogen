#!/usr/bin/env node
import * as docgen from "react-docgen-typescript"
import { convertArgsToCode, createStory, generateArgs, getTsxFiles } from './utils';

const options = {
  savePropValueAsString: true,
};

const path = process.argv.find(_ => _.startsWith("path="))?.replace('path=', '')

if(path === undefined) {
  console.error('No valid path argument provided. e.g. "storybook-autogen path=./src/components"')
} else {
  getTsxFiles(path).map(filePath => {
    docgen.parse(filePath, options).forEach(component => {
      let args = generateArgs(component)

      const code = convertArgsToCode(component, args)

      createStory(component, code)
    })
  })
}


