export default class RestoService {
    
    url = 'http://localhost:3001/menu';

    async getMenuItems() {
        const res = await fetch(this.url); 

        if (!res.ok) {
            throw new Error(`Could now fetch ${this.url}, status ${res.status}`);
        }

        return await res.json();
    }

}
