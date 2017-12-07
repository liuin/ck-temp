import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

const Products = () => {
  console.log(arguments);
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
    </div>
  );
};

// export default Products;
export default Products;