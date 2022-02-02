export type MachineContext<TContext extends Record<string, any>, TKeys = ""> = {
  [K in keyof TContext]: K extends TKeys ? TContext[K] : TContext[K] | null;
};

export type OnlyMachineContext<
  TContext extends Record<string, any>,
  TKeys = ""
> = {
  [K in keyof TContext]: K extends TKeys ? TContext[K] : null;
};

export type OmitMachineContext<
  TContext extends Record<string, any>,
  TKeys = ""
> = {
  [K in keyof TContext]: K extends TKeys ? null : TContext[K];
};
