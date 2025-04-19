import { BaseRepository } from "../../../entities/baseRepository/baseRepository";
import { IUrl } from "../../../entities/IUrl";
import { IUrlRepository } from "../../../entities/repository/IurlRepository";
import { UrlModal } from "../modals/urlModal";


export class UrlRepository extends BaseRepository<IUrl> implements IUrlRepository {
    constructor(){
        super(UrlModal)

    }
    async findByOrginalUrl (origUrl:string):Promise<IUrl>{
        try {
            const orginalUrl = await UrlModal.findOne({origUrl})
            return orginalUrl as IUrl
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

    async findByShortUrl(urlId:string):Promise<IUrl>{
        try {
            const url = await UrlModal.findOne({urlId})
            const increment = await this.incremenClick(urlId)
            return increment as IUrl
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

    async incremenClick(urlId : string):Promise<IUrl>{
        try {
            const url = await UrlModal.findOneAndUpdate(
                { urlId: urlId },            
                { $inc: { clicks: 1 } },    
                { new: true }               
              );
              return url as unknown as IUrl
              
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}