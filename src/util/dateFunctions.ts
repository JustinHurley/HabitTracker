import moment from 'moment-timezone';
import { primaryColor, timezone } from '.';

export const countByDate = (timestamps: string[]) => {
    return timestamps.reduce((acc: any, timestamp: string) => {
        const date = timestamp.split('T')[0]
        acc[date] = acc[date] ? acc[date] + 1 : 1
        return acc
    }, {})
}

export const countByDateInRange = (start: Date, end: Date, timestamps: Date[]) => {
    return timestamps.reduce((acc: any, date: Date) => {
        const currDate = new Date(date.toISOString().split('T')[0])
        if (currDate >= start && currDate <= end) {
            const updatedDate = currDate.toISOString().split('T')[0]
            acc[updatedDate] = acc[updatedDate] ? acc[updatedDate] + 1 : 1
        }
        return acc
    }, createDateMap(start, end))
}

export const countByHour = (timestamps: Date[], date?: any) => {
    const today = date ? date : getNow().toISOString().split('T')[0]
    return timestamps.reduce((acc: any, timestamp: Date) => {
        const curr = timestamp.toISOString().split('T')[0]
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

export const convertDatesToTimezone = (timestamps: string[], tz = timezone): Date[] => {
    return timestamps.reduce((acc: any, time: string) => {
        const date = new Date(time)
        acc.push(moment.utc(date).tz(tz).toDate())
        return acc
    }, [])
}

export const createDateMap = (startDate: Date, endDate: Date) => {
    const dateMap: any = {};
    const start = new Date(startDate.toISOString().split('T')[0])
    const end = new Date(endDate.toISOString().split('T')[0])
    let current = new Date(start);
    while (current <= end) {
        // Format the date as a string (e.g., 'YYYY-MM-DD')
        const dateKey = current.toISOString().split('T')[0];
        // Set the value to 0
        dateMap[dateKey] = 0;
        // Move to the next day
        current.setDate(current.getDate() + 1);
    }
    return dateMap;
}

export const convertToHour = (timestamp: Date, useAmPm = true): string => {
    const hour = parseInt(timestamp.toISOString().split('T')[1].split(':')[0])
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

export const getAmPmTime = (time: Date): string => {
    if (!(time instanceof Date)) {
        console.error(`Invalid Date entered in getAmPmTime: ${time}`)
        return 'ERROR: Invalid time'
    }
    const hours = time.getHours()
    const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`
    let ans = ''
    if (hours === 0 || hours === 12) {
        ans = `12${minutes}`
    } else {
        ans = `${hours%12}:${minutes}`
    }
    if (hours < 13) {
        ans = `${ans} AM`
    } else {
        ans = `${ans} PM`
    }
    return ans
}

export const nDaysBeforeToday = (n: number): Date => {
    const today = getToday()
    today.setDate(today.getDate() - n)
    const before = new Date(today)
    before.setHours(0, 0, 0, 0)
    return before
}

// Looks back and counts all the timestamps between n days ago to until days ago
export const countPastNDays = (n: number, timestamps: Date[], until = 0): number => {
    return Object.values(timestamps).reduce((acc: number, date: Date) => {
        const curr = date
        const start = new Date(nDaysBeforeToday(n))
        const end = getEndOfDay(new Date(nDaysBeforeToday(until)))
        if (curr <= end && curr >= start) {
            return acc + 1
        } 
        return acc
    }, 0) as number;
}

export const calculatePastNDayAverage = (n: number, timestamps: any, until?: number): number => {
    const pastNDays: any = countByDateInRange(nDaysBeforeToday(n - 1), nDaysBeforeToday(until ?? 0), timestamps)
    // Handle div by 0 err
    if (Object.keys(pastNDays).length === 0) {
        return 0
    }

    return Object.values(pastNDays).reduce((acc: number, count: any) => {
        return acc + count
    }, 0) / Object.keys(pastNDays).length
}

export const getMostRecent = (timestamps: Date[]): Date | null => {
    const now = getNow()
    return timestamps.reduce((mostRecent: Date, curr: Date) => {
        if (curr <= now && curr > mostRecent) {
            mostRecent = curr
        }
        return mostRecent
    }, null as unknown as Date);
}

export const getDifferenceInDays = (date1: Date, date2: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(diffTime / oneDay);
    return diffDays;
}

export const getNow = (): Date => {
    return moment().tz(timezone).toDate()
}

export const getToday = (): Date => {
    const today = moment().tz(timezone).toDate()
    today.setHours(0, 0, 0, 0)
    return today
}

export const getEndOfDay = (date: Date): Date => {
    const res = date
    res.setHours(23, 59, 59, 9)
    return res
}

// Gets how many total days have passed (rounds down)
export const daysToLast = (times: Date[]): string => {
    const mostRecent = getMostRecent(times)
    const now = getNow()
    const diff = getDifferenceInDays(mostRecent ?? now, now)
    if (diff <= 0) {
        return '(Today)'
    } else if (diff === 1) {
        return '(Yesterday)'
    } else {
        return `(${diff} days ago))`
    }
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
            },
            maintainAspectRatio: false
        }
    };
}

export const getDailyBarGraphConfig = (dates: any) => {
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
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            maintainAspectRatio: false
        }
    };
}