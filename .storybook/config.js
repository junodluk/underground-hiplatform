import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'underGROUND - Storybook',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
});

// automatically import all files ending in *.stories.js
const req = require.context('../src/components/', true, /\.story\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
