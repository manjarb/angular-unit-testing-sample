import { TestBed } from '@angular/core/testing';

import { StockInventoryService } from './stock-inventory.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting()
// );

function createResponse(body) {
  return of(body);
}

class MockHttp {
  get() {
    return createResponse([]);
  }
}

const cartItems = [
  { product_id: 1, quantity: 10 },
  { product_id: 2, quantity: 5 }
];

const productItems = [
  { id: 1, price: 10, name: 'Test' },
  { id: 2, price: 100, name: 'Anthoher Item' }
];

describe('StockInventoryService', () => {
  let service: StockInventoryService;
  let http: HttpClient;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
        { provide: HttpClient, useClass: MockHttp }
      ]
    });

    http = bed.get(HttpClient);
    service = bed.get(StockInventoryService);
  });

  it('should get carts items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...cartItems]));

    service.getCartItems().subscribe(result => {
      console.log(result);
      expect(result.length).toBe(2);
      expect(result).toEqual(cartItems);
    });
  });

  it('should get product items', () => {
    spyOn(http, 'get').and.returnValue(createResponse([...productItems]));

    service.getProducts().subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(productItems);
    });
  });
});
