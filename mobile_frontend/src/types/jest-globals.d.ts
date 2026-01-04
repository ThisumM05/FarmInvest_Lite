declare const jest: {
  fn: (...args: any[]) => any;
  mock: (...args: any[]) => any;
};

declare function describe(name: string, fn: () => void): void;

declare function it(name: string, fn: () => any | Promise<any>): void;

declare function expect(actual: any): any;
