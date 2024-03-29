# Automatic story generation

Automatically generates stories for [Storybook](https://storybook.js.org/)
###### Simply add a single line JSDoc annotation in your React component prop to create one or multiple stories 

![Demo](assets/demo-preview.gif)

## Getting started

1. Install package 

```
npm i storybook-autogen
```

2. Add [JSDoc](https://jsdoc.app/) tag for possible values
```
/**
  * Button contents
  * @autogen {"values": ["Shortlabel", "Very long label that may break"]}
  */
label: string;
```
e.g. [example/src/components/Button.tsx](https://github.com/tlow92/storybook-autogen/blob/main/example/src/components/Button.tsx#L14)
Code generation will create combinations of values for different props to generate stories.

3. Run story generation

```
storybook-autogen path=./src/components
```

4. (Optional) Add generation before running storybook

```
"storybook": "storybook-autogen path=./src/components && storybook dev -p 6006",
"build-storybook": "storybook-autogen path=./src/components && storybook build"
```
e.g. [example/package.json](https://github.com/tlow92/storybook-autogen/blob/main/example/package.json#L11)


## Run example

1. Clone repository
```
git clone git@github.com:tlow92/storybook-autogen.git
```

2. Install dependencies
```
cd example && npm install
```

3. Run storybook script (includes generation step)
```
npm run storybook
```


## Roadmap
- [ ] Support passing regex instead of folder path
- [ ] Support config for:
  - [ ] path to folder/regex
  - [ ] overwrite/update option
  - [ ] generate stories for optional props
  - [ ] toggle/modify combination of props
- [ ] Convert to storybook addon (Needs investigation)
- [ ] Generate values without need for JSDoc tags
  - Maybe generate parameters using fakerjs 
