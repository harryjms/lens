/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";

import cronJobsRouteInjectable from "./cron-jobs-route.injectable";
import {
  workloadsChildSidebarItemsInjectionToken,
} from "../+workloads/workloads-sidebar-items.injectable";
import navigateToRouteInjectable from "../../routes/navigate-to-route.injectable";
import currentRouteInjectable from "../../routes/current-route.injectable";

const cronJobsSidebarItemsInjectable = getInjectable({
  id: "cron-jobs-sidebar-items",

  instantiate: (di) => {
    const route = di.inject(cronJobsRouteInjectable);
    const currentRoute = di.inject(currentRouteInjectable);
    const navigateToRoute = di.inject(navigateToRouteInjectable);

    return computed(() => [
      {
        title: "CronJobs",
        onClick: () => navigateToRoute(route),
        isActive: route === currentRoute.get(),
        isVisible: route.isEnabled(),
      },
    ]);
  },

  injectionToken: workloadsChildSidebarItemsInjectionToken,
});

export default cronJobsSidebarItemsInjectable;