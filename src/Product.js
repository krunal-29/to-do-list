import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        let myarray = res.data;
        setIsLoading(false);
        setProduct([...myarray]);
      })
      .catch((e) => {
        console.log("error", e);
      });
  }, []);

  return (
    <Box style={{ backgroundColor: "#dedede" }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Product
        </Typography>
        {isLoading ? (
          <>  <Box sx={{ display: 'flex' ,justifyContent:"center"}} >
          <CircularProgress />
        </Box></>
        ) : (
          <>
            {product.map((pro) => (
              <Card key={pro.id} variant="outlined" sx={{ mb: 2 }}  item xs={4}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Product ID: {pro.id}
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom>
                    {pro.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Price: ${pro.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Category: {pro.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Description: {pro.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Container>
    </Box>
  );
}
