import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import {
  getRestoredSearch,
  pickQueryParams,
  updateNamespaceSnapshot
} from "./utils";

const STORAGE_KEY = "persisted-query-params";

type PersistedQueryParamsNamespace =
  | "streams"
  | "replays"

type PersistedQueryParamsRoot = Partial<
  Record<PersistedQueryParamsNamespace, Record<string, string>>
>;

interface PersistedQueryParamsProps extends PropsWithChildren {
  keys: readonly string[];
  storageNamespace: PersistedQueryParamsNamespace;
}

export const PersistedQueryParams = ({
  keys,
  storageNamespace,
  children
}: PersistedQueryParamsProps) => {
  const location = useLocation();

  const [root, setRoot] = useLocalStorage<PersistedQueryParamsRoot>(
    STORAGE_KEY,
    {}
  );
  const snapshot = root[storageNamespace] || {};

  const [initialRestoreSearch] = useState(() =>
    getRestoredSearch(snapshot, window.location.search)
  );

  useEffect(() => {
    if (!("navigation" in window)) return;

    const navigation = window.navigation;
    const handler = (event: NavigateEvent) => {
      const url = new URL(event.destination.url);
      // Only persist same-page navigations; leaving the page must not wipe storage
      if (url.pathname !== window.location.pathname) return;
      const nextSnapshot = pickQueryParams(url.search, keys);
      setRoot((prev) =>
        updateNamespaceSnapshot(prev, storageNamespace, nextSnapshot)
      );
    };

    navigation.addEventListener("navigate", handler);
    return () => navigation.removeEventListener("navigate", handler);
  }, [storageNamespace]);

  if (!!initialRestoreSearch && location.search !== initialRestoreSearch) {
    return (
      <Navigate
        to={{ pathname: location.pathname, search: initialRestoreSearch }}
        replace
      />
    );
  }

  return <>{children}</>;
};
