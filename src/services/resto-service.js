export default class RestoService {
    
    _apiBase = 'http://localhost:3001/menu';

    async getMenuItems(_apiBase) {
        const res = await fetch(this._apiBase); 

        if (!res.ok) {
            throw new Error(`Could now fetch ${this.url}, status ${res.status}`);
        }

        return await res.json();
    }

}
