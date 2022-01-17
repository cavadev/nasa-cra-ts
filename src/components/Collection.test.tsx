import { render, screen } from '@testing-library/react';
import Collection from './Collection';
import { fakeCollection } from '../mocks';
import { Asset } from '../interfaces';

const fakeItems: Asset[] = fakeCollection.items;

describe('Collection component', () => {

  test('render the asset cards', async () => {
    render(<Collection items={fakeItems}/>);
    const assetCard = screen.getByTestId('asset-card')
    expect(assetCard).toBeInTheDocument();
  });

})
