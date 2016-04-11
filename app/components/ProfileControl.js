import React, { PropTypes } from 'react';
import Button from './Button';
import QuickControl from './QuickControl';

const propTypes = {
  recording: PropTypes.bool.isRequired,
  onToggleRecordClick: PropTypes.func.isRequired,
};

export default function ProfileControl({ recording, onToggleRecordClick }) {
  const triggerText = recording ? 'Stop' : 'Start';
  return (
    <QuickControl>
      <Button onClick={onToggleRecordClick}>{triggerText}</Button>
    </QuickControl>
  );
}

ProfileControl.propTypes = propTypes;
