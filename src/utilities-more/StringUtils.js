import voca from 'voca';

export default class StringUtils {
    constructor() {
        console.log('in utilities-more/StringUtilsgUtils.js');
    }

    decapitalizeString( inputString ){
        return `Decapitalizing ${inputString} to ${voca.decapitalize(inputString)}`;
    }

}