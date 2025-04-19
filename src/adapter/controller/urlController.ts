import { NextFunction , Request , Response } from "express";
import { UrlService } from "../../useCase/urlService";
import { HttpStatus } from "../../framework/utils/statusCodes";

export class UrlController {
    private urlService
    constructor(useCase:UrlService) {
        this.urlService = useCase
        
    }
    createUrl = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {origUrl} = req.body
            const savedUrl = await this.urlService.createUrl(origUrl)
            res.status(HttpStatus.OK).json({savedUrl , message:"short Url Created"})
        } catch (error) {
            console.log(error)
            next(error)
            
        }
    }
     getOrigUrl = async(req:Request, res:Response, next:NextFunction)=>{
        try {
            const {urlId}= req.params;
            const savedUrl = await this.urlService.getOrigUrl(urlId)
            res.redirect(savedUrl)
            
        } catch (error) {
            next(error)
            
        }
    }
    
}