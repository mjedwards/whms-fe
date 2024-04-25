import React from 'react';

import { OrganizationModel } from './index.model';

function useOrganizationPresenter() {
  const { current: organization } = React.useRef<OrganizationModel>(new OrganizationModel());

  return organization;
}

export { useOrganizationPresenter, OrganizationModel };