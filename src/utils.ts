import * as fs from 'fs';
import * as docgen from "react-docgen-typescript"

export type PropValues = Record<string, Array<any>>
export type GeneratedArgs = Record<string, any>

function getStoriesPath(componentPath: string) {
  return componentPath.replace('.tsx', '.stories.ts')
}

export function getTsxFiles(folder: string) {
  return fs.readdirSync(folder)
  .map(filename => {
    return `${folder}/${filename}`
  })
  .filter(_ => _.includes('.tsx'))
  .filter(_ => {
    return !fs.existsSync(getStoriesPath(_))
  })
}

export function createStory(componentDoc: docgen.ComponentDoc, stories: string) {
  fs.writeFileSync(getStoriesPath(componentDoc.filePath), `
  import type { Meta, StoryObj } from '@storybook/react';
  import { ${componentDoc.displayName} } from './${componentDoc.displayName}';

  const meta = {
    component: ${componentDoc.displayName},
  } satisfies Meta<typeof ${componentDoc.displayName}>;

  export default meta;
  type Story = StoryObj<typeof meta>;
  ${stories}
  `)
}

// TODO: This can be optimized
export const getCombinations = (obj: PropValues): GeneratedArgs[] => {
  let tmp = Object.entries(obj).reduce(
    (acc, [key, values]) =>
      acc.flatMap((combo) =>
      values.map((value) => { return ({ ...combo, [key]: value })})
      ),
    [{}]
  )

  for (let i = 1; i < tmp.length; i++) {
    for (const key in tmp[i]) {
      const first = (tmp[0] as any)[key]
      const curr =  (tmp[i] as any)[key]
      if (first === curr) {
        delete (tmp[i] as any)[key];
      }
    }
  }
  return tmp
}

// TODO: For now only required props are used
export function generateArgs(componentDoc: docgen.ComponentDoc): GeneratedArgs[] {
  let res: PropValues = {}
  Object.keys(componentDoc.props).forEach(key => {
    const val = componentDoc.props[key]
    if(!val.required) return

    try {
      const autogenOccurence = val.description.match(/(@autogen).+/)?.[0].replace('@autogen', '').trim()
      if(!autogenOccurence) return
      const propValues = JSON.parse(autogenOccurence).values
      res[key] = propValues
    } catch(e) {
      console.warn(e)
      return
    }
  })
  return getCombinations(res)
}

// TODO: use ComponentDoc to generate better story names
export function convertArgsToCode(componentDoc: docgen.ComponentDoc, args: GeneratedArgs[]) {
  return args.map((arg, index) => {
    return `
  export const ${index === 0 ? 'Default' : `Default${index}`}: Story = {
    "args": {${index === 0 ? '' : '\n      ...Default.args,'}
      ${JSON.stringify(arg, null, 6).slice(1, -1).trim()}
    }
  }`
  }).join('\n')
}