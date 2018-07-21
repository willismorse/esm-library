import voca from 'voca';

export default class StringUtils {
     constructor() {
         console.log('in utilities/StringUtilsgUtils.js');
     }

     capitalizeString( inputString ){
         return `Capitalizing ${inputString} to ${voca.capitalize(inputString)}`;
     }
}