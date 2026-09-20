import app from "./app/app.js";
import { config } from "./config/config.js";

const PORT = config.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});