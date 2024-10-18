import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

interface Campesino {
  _id: string;
  cultivo: string;
  edad: number;
  experiencia: number;
  nombre: string;
  origen: string;
}

const ProductPerformance = () => {
  const [campesinos, setCampesinos] = useState<Campesino[]>([]);

  const columns = [
    { title: "Nombre", field: "nombre" },
    { title: "Cultivos", field: "cultivo" },
    { title: "Edad", field: "edad" },
    { title: "Experiencia", field: "experiencia", type: "numeric" },
  ];

  useEffect(() => {
    async function fetchCampesinos() {
      try {
        const response = await axios.get('http://127.0.0.1:5001/get-campesinos');
        setCampesinos(response.data as Campesino[]);
      } catch (error) {
        console.error("Error fetching campesinos:", error);
      }
    }

    fetchCampesinos();
  }, []);

  return (
    <BaseCard title="Campesinos">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.title}>
                  <Typography color="textSecondary" variant="h6">
                    {column.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {campesinos.map((campesino) => (
              <TableRow>
                <TableCell key={campesino._id}>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {campesino.nombre}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {campesino.origen}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{campesino.cultivo}</TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: "#04C9D7",
                      color: "#fff",
                    }}
                    size="small"
                    label={campesino.edad}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{campesino.experiencia}/100</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductPerformance;
