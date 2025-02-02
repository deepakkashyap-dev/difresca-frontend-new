import React from 'react';
import { Attribute } from '../../utils/types';

const ProductInfoList = ({ allAttr }: { allAttr: Attribute[] }) => {
  return (
    <div className="py-4">
      <dl>
        {allAttr.map((attr) => (
          <React.Fragment key={attr.attribute_name}>
            <dt className="text-sm font-extrabold text-black mb-2">
              {attr.attribute_name}
            </dt>
            <dd className="text-sm mb-4 _text-default">{attr.attribute_value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default ProductInfoList;
