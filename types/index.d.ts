declare function zarcotime(then: Date | number | string, opts?: {
  now?: Date | number | string;
  numeric?: 'auto' | 'always';
  units?: { name: string; ms: number }[];
}): string;

export = zarcotime;
