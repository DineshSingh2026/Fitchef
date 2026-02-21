import { app } from './app.js';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? (process.env.PORT || 5000) : 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
