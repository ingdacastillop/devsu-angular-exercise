import { of } from 'rxjs';
import { RemoteProductRepository } from './repositories';
import { Product } from '../domain/entities';

describe('RemoteProductRepository', () => {
  let repository: RemoteProductRepository;

  let nextSpy: jasmine.Spy;

  const httpSpy = {
    post: jasmine.createSpy('post'),
    get: jasmine.createSpy('get'),
    put: jasmine.createSpy('put'),
    delete: jasmine.createSpy('delete')
  };

  const products = [
    {
      id: 'product-00',
      name: 'CIBC Aventura® Visa Infinite* Card',
      description:
        'Experience more of the world with our most flexible travel rewards program.',
      logo: 'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-aventura-visa-infinite-card/cibc-visa-aventura-infinite-fr.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      date_release: '2023-11-09T00:00:00.000+00:00',
      date_revision: '2024-11-09T00:00:00.000+00:00'
    },
    {
      id: 'prod-10',
      name: 'CIBC Dividend® Visa* Card',
      description:
        'Get the reliable, everyday use card that earns you cash back on daily essentials for no annual fee.',
      logo: 'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/dividend-cards/cibc-dividend-visa-card/cibc-dividend-visa-card-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      date_release: '2023-11-24T00:00:00.000+00:00',
      date_revision: '2024-11-24T00:00:00.000+00:00'
    }
  ];

  const product = new Product(
    'prod-11',
    'CIBC U.S. Dollar Aventura® Gold Visa* Card',
    'Shop across the border? Skip the currency conversion fees.',
    'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
    new Date('2023-11-27T00:00:00.000+00:00'),
    new Date('2024-11-27T00:00:00.000+00:00')
  );

  beforeEach(() => {
    repository = new RemoteProductRepository(httpSpy as any);

    nextSpy = spyOn(repository['products$'], 'next').and.callThrough();
  });

  afterEach(() => {
    httpSpy.post.calls.reset();
    httpSpy.get.calls.reset();
    httpSpy.put.calls.reset();
    httpSpy.delete.calls.reset();
  });

  it('should get products collection empty', (done) => {
    httpSpy.get.and.returnValue(of([]));

    repository.fetchAll((products) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(products).toBeDefined();

      done();
    });
  });

  it('should get products collection with results', (done) => {
    httpSpy.get.and.returnValue(of(products));

    repository.fetchAll((products) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(products).toBeDefined();
      expect(products?.length).toBe(2);

      done();
    });
  });

  it('should get product for productId', (done) => {
    httpSpy.get.and.returnValue(of(products));

    repository.fecthForId("product-00").subscribe((product) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(product).toBeDefined();

      done();
    });
  });

  it('should register product without adding it to the collection', (done) => {
    httpSpy.post.and.returnValue(of(undefined));

    repository.register(product).then(() => {
      expect(httpSpy.post).toHaveBeenCalledTimes(1);
      expect(nextSpy).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it('should register product adding to collection', (done) => {
    httpSpy.post.and.returnValue(of(undefined));
    httpSpy.get.and.returnValue(of(products));

    repository.fetchAll((products) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(products).toBeDefined();

      if (products?.length === 3) {
        done();
      } else {
        expect(nextSpy).toHaveBeenCalledTimes(1);
      }
    });

    repository.register(product).then(() => {
      expect(httpSpy.post).toHaveBeenCalledTimes(1);
      expect(nextSpy).toHaveBeenCalledTimes(2);
    });
  });

  it('should update product without changing it to the collection', (done) => {
    httpSpy.put.and.returnValue(of(undefined));

    repository.update(product).then(() => {
      expect(httpSpy.put).toHaveBeenCalledTimes(1);
      expect(nextSpy).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it('should update product changing to collection', (done) => {
    httpSpy.put.and.returnValue(of(undefined));
    httpSpy.get.and.returnValue(of(products));

    const product = new Product(
      'product-00',
      'CIBC U.S. Dollar Aventura® Gold Visa* Card',
      'Shop across the border? Skip the currency conversion fees.',
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      new Date('2023-11-27T00:00:00.000+00:00'),
      new Date('2024-11-27T00:00:00.000+00:00')
    );

    repository.fetchAll((products) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(products).toBeDefined();

      if (products) {
        const [product] = products;

        if (product.name === 'CIBC Aventura® Visa Infinite* Card') {
          expect(nextSpy).toHaveBeenCalledTimes(1);
        } else {
          expect(nextSpy).toHaveBeenCalledTimes(2);
          expect(product.name).toBe(
            'CIBC U.S. Dollar Aventura® Gold Visa* Card'
          );
          done();
        }
      }
    });

    repository.update(product).then(() => {
      expect(httpSpy.put).toHaveBeenCalledTimes(1);
    });
  });

  it('should delete product without removing it to the collection', (done) => {
    httpSpy.delete.and.returnValue(of(''));

    repository.remove(product).then(() => {
      expect(httpSpy.delete).toHaveBeenCalledTimes(1);
      expect(nextSpy).toHaveBeenCalledTimes(0);
      done();
    });
  });

  it('should delete product without removing it to the collection', (done) => {
    httpSpy.get.and.returnValue(of(products));
    httpSpy.delete.and.returnValue(of(''));

    const product = new Product(
      'product-00',
      'CIBC U.S. Dollar Aventura® Gold Visa* Card',
      'Shop across the border? Skip the currency conversion fees.',
      'https://www.cibc.com/content/dam/global-assets/card-art/credit-cards/aventura-cards/cibc-us-dollar-aventura-gold-visa-card/cibc-visa-aventura-us-dollar-en.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png',
      new Date('2023-11-27T00:00:00.000+00:00'),
      new Date('2024-11-27T00:00:00.000+00:00')
    );

    repository.fetchAll((products) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(products).toBeDefined();

      if (products?.length === 2) {
        expect(nextSpy).toHaveBeenCalledTimes(1);
      } else {
        expect(nextSpy).toHaveBeenCalledTimes(2);
        done();
      }
    });

    repository.remove(product).then(() => {
      expect(httpSpy.delete).toHaveBeenCalledTimes(1);
    });
  });

  it('should return valid for verify productId', (done) => {
    httpSpy.get.and.returnValue(of('true'));

    repository.verify('product-00').then((valid) => {
      expect(httpSpy.get).toHaveBeenCalledTimes(1);
      expect(valid).toBeTrue();
      done();
    });
  });
});
