import { Router } from "express";
import { generateShortCode } from "../utils/generateShortCode.js"
import { UrlModel } from "../models/url.model.js"

const urlRouter = Router();


// POST => http://localhost:3000/api/url
urlRouter.post("/", async (req, res) => { 
    try {
        const { url } = req.body;

        if (!url) { 
            return res.status(404).json({
                error: "Url not found!",
            })
        };

        if (url.startsWith("/http://") == false && url.startsWith("https://") == false) { 
            return res.status(401).json({
                error: "Invalid, url must be start with http:// or https://",
            })
        };

        if (url.length > 2048) { 
            return res.status(401).json({
                error: "Url is too long!",
            })
        };

        const shortCode = generateShortCode()

        const newUrl = await UrlModel.create({
            originalUrl: url,
            shortCode,
        });


        res.status(201).json({
            message: "Url shortened successfully",
            data: {
                url: newUrl,
            }
        })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Error while creating short code",
        })
    }
})




// GET => http://localhost:3000/api/url
urlRouter.get("/", async (req, res) => { 
    try {
        const urls = await UrlModel.find();

        return res.status(200).json({
            message: "Urls fetched successfully",
            data: {
                urls,
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error while fetching all urls!",
        })
    }
})




// Delete => http://localhost:3000/api/url/:id
urlRouter.delete("/:id", async (req, res) => { 
    try {
        const { id } = req.params;

        const url = await UrlModel.findById(id);

        if (!url) { 
            return res.status(404).json({
                message: "Url not found!",
            })
        };

        await UrlModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Url deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Error while deleting url!",
        })
    }
})




export default urlRouter;

