import Item from '../Item';

describe('Item', () => {
  it('should create an instance of Item with correct properties', () => {
    const item = new Item('categoria', 'nome', 'descricao', 100);

    expect(item).toBeInstanceOf(Item);
    expect(item).toHaveProperty('id');
    expect(item.categoria).toBe('categoria');
    expect(item.nome).toBe('nome');
    expect(item.descricao).toBe('descricao');
    expect(item.preco_unitario).toBe(100);
  });
});