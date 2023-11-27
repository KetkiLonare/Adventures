import { REACT_APP_ASSET_URL } from './envConfig';

export const assetChecker = (url) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
        return url;
    } else {
        img.onload = () => {
            return url;
        };
        img.onerror = () => {
        };
        return url;
        return `${REACT_APP_ASSET_URL}/1666179680148.png`;
        return `https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif`;
    }
}