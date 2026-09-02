// Overwrites the previously stored params for this namespace with the new ones,
// or clears the namespace entirely when the new snapshot is empty.
export const updateNamespaceSnapshot = <Namespace extends string>(
  root: Partial<Record<Namespace, Record<string, string>>>,
  namespace: Namespace,
  snapshot: Record<string, string>
) => {
  const updated = { ...root };
  if (!Object.keys(snapshot).length) {
    delete updated[namespace];
  } else {
    updated[namespace] = snapshot;
  }
  return updated;
};
