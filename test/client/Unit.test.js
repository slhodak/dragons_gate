import React from 'react';
import renderer from 'react-test-renderer';
import Unit from '../../client/components/Unit.js';
import { mockEmpire } from './__mocks__/factionMocks.js';

test('it should render correctly', () => {
  const eliteSoldier = mockEmpire.units[0];
  const tree = renderer
    .create(<Unit unit={eliteSoldier} myTurn={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
