import moment from "moment";

export const primaryColor = '#49ba49'

export const timezone = 'America/New_York';
export const now = moment.tz(timezone).toDate()
now.setHours(0, 0, 0, 0)

export const dayOptions = [1, 7, 15, 30, 60, 90]

export const hoursOfDayAmPm = {
    '12 AM': 0, '1 AM': 0, '2 AM': 0, '3 AM': 0, '4 AM': 0, '5 AM': 0, 
    '6 AM': 0, '7 AM': 0, '8 AM': 0, '9 AM': 0, '10 AM': 0, '11 AM': 0, 
    '12 PM': 0, '1 PM': 0, '2 PM': 0, '3 PM': 0, '4 PM': 0, '5 PM': 0, 
    '6 PM': 0, '7 PM': 0, '8 PM': 0, '9 PM': 0, '10 PM': 0, '11 PM': 0
}

export const hoursOfDay24 = {
    '00:00': 0, '01:00': 0, '02:00': 0, '03:00': 0, '04:00': 0, '05:00': 0, 
    '06:00': 0, '07:00': 0, '08:00': 0, '09:00': 0, '10:00': 0, '11:00': 0, 
    '12:00': 0, '13:00': 0, '14:00': 0, '15:00': 0, '16:00': 0, '17:00': 0, 
    '18:00': 0, '19:00': 0, '20:00': 0, '21:00': 0, '22:00': 0, '23:00': 0
}