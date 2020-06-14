const express = require('express');
const projectRoutes = require('./routes/projectRoutes');

const server = express();

server.use(express.json())

server.use('/projects', projectRoutes);

server.get("/", (req, res) => {
	res.status(200).json({
		message: `Welcome!`,
	})
})


server.listen(8000, () => console.log('API running on port 8000'));
