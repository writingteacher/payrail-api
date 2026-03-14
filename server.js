const dotenv = require('dotenv');
dotenv.config({ path: require('path').resolve(__dirname, '.env') });

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Payrail API running on port ${PORT}`);
});