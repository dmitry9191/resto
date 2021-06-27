export default class RestoService {
    
    _apiBase = 'http://localhost:3001/menu';
    _apiBasePost = 'http://localhost:3001/order';

    async getMenuItems(_apiBase) {
        const res = await fetch(this._apiBase); 

        if (!res.ok) {
            throw new Error(`Could now fetch ${this.url}, status ${res.status}`);
        }

        return await res.json();
    }

    async postCart(data) {

        const res = await fetch(this._apiBasePost, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

}
