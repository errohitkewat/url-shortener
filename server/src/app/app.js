import express from 'express';
import {connectDb} from "../config/db.js";
import urlRouter from '../routes/url.model.js';
import { UrlModel } from '../models/url.model.js';


const app = express();
app.use(express.json());


await connectDb()


// prefix => http://localhost:3000/api/url
app.use("/api/url", urlRouter);



// GET => http://localhost:3000/:code
app.get("/:code", async (req, res) => { 
    try {
        const { code } = req.params;

        const url = await UrlModel.findOne({
            shortCode: code,
        });

        if (!url) { 
            return res.status(404).json({
                error: "Url Not found!",
            })
        };

        res.redirect(302, url.originalUrl);

        await UrlModel.findOneAndUpdate({
            shortCode: code,
        }, {
            $inc: {
                clicks: 1,
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error while redirecting to the original url!"
        })
    }
})




export default app;

