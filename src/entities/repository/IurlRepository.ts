import { IBaseRepository } from "../baseRepository/IbaseRepository";
import { IUrl } from "../IUrl";

export interface IUrlRepository extends IBaseRepository<IUrl>{
    findByOrginalUrl (origUrl:string):Promise<IUrl>
    findByShortUrl(urlId:string):Promise<IUrl>
    
}