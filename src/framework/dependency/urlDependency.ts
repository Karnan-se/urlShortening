
import { UrlController } from "../../adapter/controller/urlController";
import { UrlService } from "../../useCase/urlService";
import { UrlRepository } from "../database/repository/urlRepository";



const repository = {
    urlRepository : new UrlRepository()
}
const urlService = new UrlService({repository})

export const urlController = new UrlController(urlService)