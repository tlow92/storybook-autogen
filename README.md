# Automatic story generation

Automatically generates stories for Storybook


### Getting started

1. Install package 

```
npm i storybook-autogen
```

2. Add JSDoc tag for possible values
```
/**
  * Button contents
  * @autogen {"values": ["Shortlabel", "Very long label that may break"]}
  */
label: string;
```
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


### Run example

1. Clone repository
```
git clone git@github.com:tlow92/storybook-autogen.git
```

2. Install dependencies
```
cd example && npm install
```

3. Run storybook
```
npm run storybook
```


### Improvements
- [ ] Support passing regex instead of folder path
- [ ] Support config for:
  - [ ] path to folder/regex
  - [ ] overwrite/update option
  - [ ] generate stories for optional props
  - [ ] toggle/modify combination of props
- [ ] Convert to storybook addon (Needs investigation)
- [ ] Generate values without need for JSDoc tags
  - Maybe generate parameters using fakerjs 
