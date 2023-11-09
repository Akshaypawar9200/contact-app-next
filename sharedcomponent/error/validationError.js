import { enqueueSnackbar } from 'notistack';
import React, { Component } from 'react';

export default class ValidationError extends Component {
  constructor(message,errorcode=403,specificError=enqueueSnackbar(message, { variant: 'error' })) {
    super(message,errorcode,specificError);
    this.name = 'ValidationError';
    console.log(message);
 
  }
}
