"use client";

import React from 'react'
import DocTable from '../common/simpletable'



const Tab2Dts = ({datatable}) => {
  return (
    <div>
      <DocTable rows={datatable} />
    </div>
  );
};

export default Tab2Dts