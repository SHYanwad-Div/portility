// src/components/TaskCard.jsx
import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskCard({ task = {}, onToggle, onDelete, onEdit }) {
  const completed = Boolean(task.completed);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ textDecoration: completed ? "line-through" : "none" }} className="silkscreen">
          {task.title}
        </Typography>

        <Box>
          <IconButton onClick={onToggle} title={completed ? "Mark incomplete" : "Mark complete"}>
            {completed ? <CheckCircleOutlineIcon color="primary" /> : <RadioButtonUncheckedIcon />}
          </IconButton>

          <IconButton onClick={() => onEdit && onEdit(task)} title="Edit">
            <EditIcon />
          </IconButton>

          <IconButton onClick={onDelete} title="Delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {task.description}
      </Typography>
    </Paper>
  );
}
