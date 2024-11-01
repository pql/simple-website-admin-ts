declare type NameValue<T> = {
  name: string;
  value: T;
};

declare type NameValue = NameValue<string>;
