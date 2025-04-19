import { nanoid } from "nanoid"
import { ConfigKeys } from "../config";
import { IUrlRepository } from "../entities/repository/IurlRepository";
import { IUrl } from "../entities/IUrl";
import AppError from "../framework/utils/appError";

interface Dependency{
    repository :{
        urlRepository :IUrlRepository
    }

}
export class UrlService {
    private urlRepository
    constructor(dependency:Dependency){
        this.urlRepository = dependency.repository.urlRepository

    }
    createUrl = async(origUrl:string)=>{
        try {
            const urlId = nanoid(6);
            const shortUrl = `${ConfigKeys.BASE_URL}/url/${urlId}`;
            const isExising = await this.urlRepository.findByOrginalUrl(origUrl)
            if(isExising){
                throw AppError.conflict("This URl already Exists")
            }
            const saveUrl = await this.urlRepository.create({urlId , shortUrl , origUrl}as IUrl)
            return saveUrl

            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }
    getOrigUrl = async(urlId:string)=>{
        try {
            const savedURl = await this.urlRepository.findByShortUrl(urlId)
            return savedURl.origUrl
            
        } catch (error) {
            throw error
            
        }
    }
}