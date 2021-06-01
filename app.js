import express from 'express';
import tasksGET from './routes/tasks.get.js';
import taskPOST from './routes/task.post.js';
import taskPATCH from './routes/task.patch.js';
import taskDEL from './routes/task.delete.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(tasksGET);
app.use(taskPOST);
app.use(taskPATCH);
app.use(taskDEL);

app.listen(PORT, () => {
    console.log(`Server started...`);
})