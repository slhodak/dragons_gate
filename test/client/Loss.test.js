import React from 'react';
import renderer from 'react-test-renderer';
import Loss from '../../client/components/Loss.js';

test('renders correctly', () => {
  const tree = renderer
    .create(<Loss loss={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
