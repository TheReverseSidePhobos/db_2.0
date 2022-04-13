import { exampleTasks } from './data/exampleTasks';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(exampleTasks);
  }
}
