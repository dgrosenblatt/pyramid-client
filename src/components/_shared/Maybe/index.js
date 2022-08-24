/**
 * When value prop is null or undefined, renders empty fragment
 *
 * When value is present, renders children
 *
 * Use to avoid excessive JSX `{name && <div><label>Name: </label>{name}</div>}`
 *
 * Becomes:
 * ```
 *   <Maybe value={name}>
 *     <div><label>Name: </label>{name}</div>
 *   </Maybe>
 * ```
 * @param {any} value Value that might present or null|undefined
 * @returns ReactNode
 */

const Maybe = ({ value, children }) => {
  const valueNullOrUndefined = value === null || typeof value === "undefined";

  return valueNullOrUndefined ? <></> : <>{children}</>;
};

export default Maybe;
