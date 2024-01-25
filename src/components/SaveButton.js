import React from 'react';
import { Button } from 'react-bootstrap';
import './SaveButton.css'; 

const SaveButton = ({ onSave }) => {
    return <Button className="custom-save-button" onClick={onSave}>Save</Button>;
};

export default SaveButton;

