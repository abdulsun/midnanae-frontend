import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';



function Poooopurch() {

const file = "hello";
console.log(file)

  return (
    <Box     
    >
      <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
        <Typography variant="h4">
          เพิ่มข้อมูลสินค้า
        </Typography>
      <h2>{file}</h2>
      </Container>
    </Box>
  );
}

export default function product() {
  return <Poooopurch />;
}