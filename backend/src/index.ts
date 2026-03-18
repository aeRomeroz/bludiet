import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patients';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/patients', patientRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});