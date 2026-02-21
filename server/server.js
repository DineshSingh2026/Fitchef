import { app } from './app.js';

const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 5001);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
