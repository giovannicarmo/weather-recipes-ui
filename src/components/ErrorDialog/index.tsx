import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import DialogRef from '../../interfaces/DialogRef';
import ErrResponse from '../../interfaces/ErrResponse';

const ErrorDialog: React.RefForwardingComponent<DialogRef, ErrResponse> = (
  { data, status, statusText },
  ref
) => {
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({ show }));

  return (
    <Dialog open={open} onClose={hide}>
      <DialogTitle>{`${status} - ${statusText}`}</DialogTitle>
      <DialogContent>
        <DialogContentText>{data}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default forwardRef(ErrorDialog);
