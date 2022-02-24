/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { withInjectables } from "@ogre-tools/injectable-react";
import type { IComputedValue } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import extensionPageInjectable from "./extension-page.injectable";
import { SiblingsInTabLayout } from "../components/layout/siblings-in-tab-layout";
import type { PageParams } from "../../extensions/registries";

interface Dependencies {
  asd: IComputedValue<{
    Component: React.ComponentType<any>;
    pageParams: PageParams;
    shouldRenderTabLayout: boolean;
  }>;
}

const NonInjectedExtensionPage = observer(({ asd }: Dependencies) => {
  const { Component, pageParams, shouldRenderTabLayout } = asd.get();

  if (!shouldRenderTabLayout) {
    return <Component params={pageParams} />;
  }

  return (
    <SiblingsInTabLayout>
      <Component params={pageParams} />
    </SiblingsInTabLayout>
  );
});

export const ExtensionPage = withInjectables<Dependencies>(
  NonInjectedExtensionPage,

  {
    getProps: (di) => ({
      asd: di.inject(extensionPageInjectable),
    }),
  },
);
