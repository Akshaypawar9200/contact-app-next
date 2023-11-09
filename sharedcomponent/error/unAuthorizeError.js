

import { enqueueSnackbar } from 'notistack';
import React, { Component } from 'react';

export default class unAuthorizeError extends Component {
  constructor(message,errorcode=403,specificError=enqueueSnackbar("unAuthorizeError", { variant: 'error' })) {
    super(message,errorcode,specificError);
    this.name = 'unAuthorizeError';
  console.log("unAuthorizeError",message,errorcode,specificError);
  }
}
