import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent = ({ breadcrumbs }) => {
  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, index) => (
        <Breadcrumb.Item
          key={index}
          href={breadcrumb.url} // Assuming each breadcrumb item has a 'url' property
          active={index === breadcrumbs.length - 1} // Mark the last item as active
        >
          {breadcrumb.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;