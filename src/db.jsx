
import Dexie from 'dexie';

const db = new Dexie('HiFyDB');
db.version(1).stores({ artists: 'id,artist_id,user_id, name', albums: 'id,album_id,user_id, name', tracks: 'id,track_id,user_id, name' });
export default db;