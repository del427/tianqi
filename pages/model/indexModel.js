import {Request} from '../../utils/request.js'
class IndexModel extends Request {
  getWeather(url){
  
    return this.getData({url})
  }
  getManyDay(url){
    return this.getData({url})
  }
  getLife(url){
    return this.getData({url})
  }
  getCity(url){
    
    return this.getData({url})
  }
}
export {IndexModel}