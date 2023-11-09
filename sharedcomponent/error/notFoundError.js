import { enqueueSnackbar } from 'notistack';
import React, { Component } from 'react';

export default class NotFoundError extends Component {
  constructor(message,errorcode=403,specificError=enqueueSnackbar("NotFoundError", { variant: 'error' })) {
    super(message,errorcode,specificError);
    this.name = 'NotFoundError';
  console.log("NotFoundError",message,errorcode,specificError);
  }
}
