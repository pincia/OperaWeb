import { useState, useEffect } from 'react';
import { Typography, TextField } from '@mui/material';

const EditableCell = ({ value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleSave = () => {
        setIsEditing(false);
        if (tempValue !== value) {
            onSave(tempValue); // Salva solo se il valore è cambiato
        }
    };

    return isEditing ? (
        <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleSave}
            autoFocus
        />
    ) : (
        <Typography
            onClick={() => setIsEditing(true)}
            sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            }}
        >
                {tempValue || '-'}
        </Typography>
    );
};

export default EditableCell;
