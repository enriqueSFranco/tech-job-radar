import app from "./app"
import {PORT} from "./config/environment"

const port = PORT || 3000

app.listen(port, () => {
  console.log(`Server running on port ${PORT}`);
});
