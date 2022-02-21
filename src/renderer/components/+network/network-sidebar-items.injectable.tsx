/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable, getInjectionToken } from "@ogre-tools/injectable";
import { computed, IComputedValue } from "mobx";
import { sidebarItemsInjectionToken } from "../layout/sidebar-items.injectable";
import { Icon } from "../icon";
import React from "react";
import type { ISidebarItem } from "../layout/sidebar";
import { noop, some } from "lodash/fp";


export const networkChildSidebarItemsInjectionToken = getInjectionToken<IComputedValue<ISidebarItem[]>>({
  id: "network-child-sidebar-items-injection-token",
});

const networkSidebarItemsInjectable = getInjectable({
  id: "network-sidebar-items",

  instantiate: (di) => {
    const childSidebarItems = di.injectMany(
      networkChildSidebarItemsInjectionToken,
    );

    return computed(() => {
      const childItems = childSidebarItems
        .flatMap((items) => items.get());

      return [
        {
          getIcon: () => <Icon material="device_hub" />,
          title: "Network",
          onClick: noop,
          isActive: some({ isActive: true }, childItems),
          isVisible: some({ isVisible: true }, childItems),
          children: childItems,
        },
      ];
    });
  },

  injectionToken: sidebarItemsInjectionToken,
});

export default networkSidebarItemsInjectable;