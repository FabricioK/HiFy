import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons/faPepperHot';
import { faUserNinja } from '@fortawesome/free-solid-svg-icons/faUserNinja';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { faSmile } from '@fortawesome/free-solid-svg-icons/faSmile';

export const _popularity = (is_child, index, pop) => {
    let tag = {
        text: "HOT", icon: <FontAwesomeIcon icon={faPepperHot} />
    };;
    if (pop >= 60 && pop <= 79)
        tag = { text: 'Cool', icon: <FontAwesomeIcon icon={faHeart} /> };
    if (pop >= 30 && pop <= 59)
        tag = { text: 'Regular', icon: <FontAwesomeIcon icon={faSmile} /> };
    if (pop <= 30)
        tag = { text: 'Underground', icon: <FontAwesomeIcon icon={faUserNinja} /> };

    return (index == 0 && !is_child) ?
        { cols: 2, rows: 2, tag } : { cols: 1, rows: 1, tag }
}