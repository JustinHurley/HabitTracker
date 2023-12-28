import moment from 'moment-timezone';
import { now, primaryColor, timezone } from '.';

export const countByDate = (timestamps: string[]) => {
    return timestamps.reduce((acc: any, timestamp: string) => {
        const date = timestamp.split('T')[0]
        acc[date] = acc[date] ? acc[date] + 1 : 1
        return acc
    }, {})
}

export const countByDateInRange = (start: string, end: string, timestamps: string[]) => {
    const startDate = new Date(start.split('T')[0])
    const endDate = new Date(end.split('T')[0])
    return timestamps.reduce((acc: any, date: string) => {
        const currDate = new Date(date.split('T')[0])
        if (currDate >= startDate && currDate <= endDate) {
            const updatedDate = currDate.toISOString().split('T')[0]
            acc[updatedDate] = acc[updatedDate] ? acc[updatedDate] + 1 : 1
        }
        return acc
    }, createDateMap(start, end))
}

export const countByHour = (timestamps: string[], date?: any) => {
    const today = date ? date : now.toISOString().split('T')[0]
    return timestamps.reduce((acc: any, timestamp: string) => {
        const curr = timestamp.split('T')[0]
        const hour = convertToHour(timestamp)
        if (curr === today) {
            acc[hour] = acc[hour] ? acc[hour] + 1 : 1
        }
        return acc
    }, makeHoursOfDayMap())
}

const makeHoursOfDayMap = (useAmPm = true) => {
    return useAmPm ? {
        '12 AM': 0, '1 AM': 0, '2 AM': 0, '3 AM': 0, '4 AM': 0, '5 AM': 0, 
        '6 AM': 0, '7 AM': 0, '8 AM': 0, '9 AM': 0, '10 AM': 0, '11 AM': 0, 
        '12 PM': 0, '1 PM': 0, '2 PM': 0, '3 PM': 0, '4 PM': 0, '5 PM': 0, 
        '6 PM': 0, '7 PM': 0, '8 PM': 0, '9 PM': 0, '10 PM': 0, '11 PM': 0
    } : {
        '00:00': 0, '01:00': 0, '02:00': 0, '03:00': 0, '04:00': 0, '05:00': 0, 
        '06:00': 0, '07:00': 0, '08:00': 0, '09:00': 0, '10:00': 0, '11:00': 0, 
        '12:00': 0, '13:00': 0, '14:00': 0, '15:00': 0, '16:00': 0, '17:00': 0, 
        '18:00': 0, '19:00': 0, '20:00': 0, '21:00': 0, '22:00': 0, '23:00': 0
    }
}

export const convertDatesToTimezone = (timestamps: string[], tz = timezone) => {
    return timestamps.reduce((acc: any, time: string) => {
        const date = new Date(time)
        acc.push(moment.utc(date).tz(tz).format())
        return acc
    }, [])
}

export const createDateMap = (startDate: string, endDate: string) => {
    const dateMap: any = {};
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        // Format the date as a string (e.g., 'YYYY-MM-DD')
        const dateKey = currentDate.toISOString().split('T')[0];
        // Set the value to 0
        dateMap[dateKey] = 0;
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateMap;
}

export const convertToHour = (timestamp: string, useAmPm = true) => {
    const hour = parseInt(timestamp.split('T')[1].split(':')[0])
    if (useAmPm) {
        if (hour === 0) {
            return '12 AM';
        } else if (hour < 12) {
            return (`${hour} AM`);
        } else if (hour === 12) {
            return ('12 PM');
        } else {
            return (`${hour - 12} PM`);
        }
    } else {
        return `${hour}:00`;
    }
}

export const nDaysBeforeToday = (n: number): Date => {
    const today = new Date(now)
    today.setDate(today.getDate() - n)
    const before = new Date(today)
    before.setHours(0, 0, 0, 0)
    return before
}

export const countPastNDays = (n: number, timestamps: any, until?: number) => {
    const adjustedN = n - 1
    return Object.values(timestamps).reduce((acc: any, date: any) => {
        const curr = new Date(date)
        const start = new Date(nDaysBeforeToday(adjustedN))
        const end = new Date(now)
        end.setDate(end.getDate() + 1)
        if (until) {
            end.setDate(end.getDate() - until)
        }
        if (curr <= end && curr >= start) {
            return acc + 1
        } 
        return acc
    }, 0)
}

export const getPastNDayAverage = (n: number, timestamps: any) => {
    const pastNDays: any = countByDateInRange(nDaysBeforeToday(n).toISOString(), nDaysBeforeToday(0).toISOString(), timestamps)
    // Handle div by 0 err
    if (Object.keys(pastNDays).length === 0) {
        return 0
    }

    return Object.values(pastNDays).reduce((acc: number, count: any) => {
        return acc + count
    }, 0) / Object.keys(pastNDays).length
}

export const getDayConfig = (dates: any) => {
    return {
        type: 'line',
        data: {
            labels: Object.keys(dates),
            datasets: [{
                label: 'Daily Tokes',
                data: Object.values(dates),
                fill: false,
                tension: 0.1,
                backgroundColor: primaryColor,
                borderColor: primaryColor,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }  
        }
    };
}

export const getHourConfig = (dates: any) => {
    return {
        type: 'bar',
        data: {
            labels: Object.keys(dates),
            datasets: [{
                label: 'Tokes',
                data: Object.values(dates),
                fill: false,
                tension: 0.1,
                backgroundColor: primaryColor
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    };
}