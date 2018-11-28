import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import Readme from './README.md';
import { Button } from './';

storiesOf('Button', module)
  .addDecorator(withReadme(Readme))

  .add('Basic Usage', () => (
    <Button label='Hello Button' />
  ));