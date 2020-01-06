/** Date and times */
export const getCurrentYear = () => new Date().getFullYear();

export const getDateFromDateTime = (datetime) => datetime.split('T')[0];
export const getTimeFromDateTime = (datetime) => (datetime.split('T')[1]).split('.')[0];
