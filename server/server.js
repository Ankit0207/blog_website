const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { userRoute } = require('./routes/userRoutes');
const { blogRoute } = require('./routes/blogRoutes');
const { commentRoute } = require('./routes/commentRoutes');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/blogs', blogRoute);
app.use('/comments', commentRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error.message)
    }
});

