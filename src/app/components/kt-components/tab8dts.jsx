"use client";

import React from 'react'
import DocTable from '../common/datatable'
import { Box } from '@mui/material';
import Botton from '../common/botton';

const Tab8Dts = () => {
  return (
    <div>
      <Box>
      </Box>
      <Box>
      <Botton text={"صدور اسناد مرتبط"}/>
      <Botton text={"برقراری ارتباط"}/>
      <Botton text={"مشاهده سند مرتبط"}/>
      <Botton text={"حذف ارتباط"}/>
      </Box>
    </div>
  );
}

export default Tab8Dts