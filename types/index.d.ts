declare namespace Zarcotime {
  export type Unit = { name: string; ms: number };
  export type Options = {
    now?: Date | number | string;
    numeric?: 'auto' | 'always';
    style?: 'long' | 'short';
    locale?: string;
    units?: Unit[];
  };
}

declare function zarcotime(then: Date | number | string, opts?: Zarcotime.Options): string;

export = zarcotime;
