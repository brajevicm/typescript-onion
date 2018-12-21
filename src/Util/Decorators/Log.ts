export function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  // keep a reference to the original function
  const originalValue = descriptor.value;

  // replace the original function with a wrapper
  descriptor.value = (...args: any[]) => {
    console.log(`=> ${propertyKey}(${args.join(', ')})`);

    // call the original function
    const result = originalValue.apply(this, args);

    console.log(`<= ${result}`);
    return result;
  };
}
