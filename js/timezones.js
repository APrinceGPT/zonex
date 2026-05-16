// Comprehensive timezone data with DST support
const TIMEZONE_DATA = {
    // Major timezones organized by region
    timezones: [
        // Asia-Pacific
        { value: 'Asia/Manila', label: 'GMT+8 (Manila, Philippines)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Shanghai', label: 'GMT+8 (Shanghai, China)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Hong_Kong', label: 'GMT+8 (Hong Kong)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Singapore', label: 'GMT+8 (Singapore)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Kuala_Lumpur', label: 'GMT+8 (Kuala Lumpur, Malaysia)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Jakarta', label: 'GMT+7 (Jakarta, Indonesia)', offset: 7, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Bangkok', label: 'GMT+7 (Bangkok, Thailand)', offset: 7, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Ho_Chi_Minh', label: 'GMT+7 (Ho Chi Minh City, Vietnam)', offset: 7, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Tokyo', label: 'GMT+9 (Tokyo, Japan)', offset: 9, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Seoul', label: 'GMT+9 (Seoul, South Korea)', offset: 9, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Kolkata', label: 'GMT+5:30 (Mumbai, India)', offset: 5.5, dst: false, region: 'Asia-Pacific' },
        { value: 'Asia/Dubai', label: 'GMT+4 (Dubai, UAE)', offset: 4, dst: false, region: 'Asia-Pacific' },
        { value: 'Australia/Sydney', label: 'GMT+10/+11 (Sydney, Australia)', offset: 10, dst: true, region: 'Asia-Pacific' },
        { value: 'Australia/Melbourne', label: 'GMT+10/+11 (Melbourne, Australia)', offset: 10, dst: true, region: 'Asia-Pacific' },
        { value: 'Australia/Perth', label: 'GMT+8 (Perth, Australia)', offset: 8, dst: false, region: 'Asia-Pacific' },
        { value: 'Pacific/Auckland', label: 'GMT+12/+13 (Auckland, New Zealand)', offset: 12, dst: true, region: 'Asia-Pacific' },
        
        // Europe
        { value: 'Europe/London', label: 'GMT+0/+1 (London, UK)', offset: 0, dst: true, region: 'Europe' },
        { value: 'Europe/Dublin', label: 'GMT+0/+1 (Dublin, Ireland)', offset: 0, dst: true, region: 'Europe' },
        { value: 'Europe/Paris', label: 'GMT+1/+2 (Paris, France)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Berlin', label: 'GMT+1/+2 (Berlin, Germany)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Rome', label: 'GMT+1/+2 (Rome, Italy)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Madrid', label: 'GMT+1/+2 (Madrid, Spain)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Amsterdam', label: 'GMT+1/+2 (Amsterdam, Netherlands)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Zurich', label: 'GMT+1/+2 (Zurich, Switzerland)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Vienna', label: 'GMT+1/+2 (Vienna, Austria)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Stockholm', label: 'GMT+1/+2 (Stockholm, Sweden)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Oslo', label: 'GMT+1/+2 (Oslo, Norway)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Copenhagen', label: 'GMT+1/+2 (Copenhagen, Denmark)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Helsinki', label: 'GMT+2/+3 (Helsinki, Finland)', offset: 2, dst: true, region: 'Europe' },
        { value: 'Europe/Warsaw', label: 'GMT+1/+2 (Warsaw, Poland)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Prague', label: 'GMT+1/+2 (Prague, Czech Republic)', offset: 1, dst: true, region: 'Europe' },
        { value: 'Europe/Moscow', label: 'GMT+3 (Moscow, Russia)', offset: 3, dst: false, region: 'Europe' },
        
        // Americas
        { value: 'America/New_York', label: 'GMT-5/-4 (New York, EST/EDT)', offset: -5, dst: true, region: 'Americas' },
        { value: 'America/Los_Angeles', label: 'GMT-8/-7 (Los Angeles, PST/PDT)', offset: -8, dst: true, region: 'Americas' },
        { value: 'America/Chicago', label: 'GMT-6/-5 (Chicago, CST/CDT)', offset: -6, dst: true, region: 'Americas' },
        { value: 'America/Denver', label: 'GMT-7/-6 (Denver, MST/MDT)', offset: -7, dst: true, region: 'Americas' },
        { value: 'America/Phoenix', label: 'GMT-7 (Phoenix, MST)', offset: -7, dst: false, region: 'Americas' },
        { value: 'America/Anchorage', label: 'GMT-9/-8 (Anchorage, AKST/AKDT)', offset: -9, dst: true, region: 'Americas' },
        { value: 'Pacific/Honolulu', label: 'GMT-10 (Honolulu, HST)', offset: -10, dst: false, region: 'Americas' },
        { value: 'America/Toronto', label: 'GMT-5/-4 (Toronto, Canada)', offset: -5, dst: true, region: 'Americas' },
        { value: 'America/Vancouver', label: 'GMT-8/-7 (Vancouver, Canada)', offset: -8, dst: true, region: 'Americas' },
        { value: 'America/Mexico_City', label: 'GMT-6/-5 (Mexico City, Mexico)', offset: -6, dst: true, region: 'Americas' },
        { value: 'America/Sao_Paulo', label: 'GMT-3/-2 (São Paulo, Brazil)', offset: -3, dst: true, region: 'Americas' },
        { value: 'America/Buenos_Aires', label: 'GMT-3 (Buenos Aires, Argentina)', offset: -3, dst: false, region: 'Americas' },
        { value: 'America/Santiago', label: 'GMT-4/-3 (Santiago, Chile)', offset: -4, dst: true, region: 'Americas' },
        { value: 'America/Bogota', label: 'GMT-5 (Bogotá, Colombia)', offset: -5, dst: false, region: 'Americas' },
        { value: 'America/Lima', label: 'GMT-5 (Lima, Peru)', offset: -5, dst: false, region: 'Americas' },
        
        // Africa & Middle East
        { value: 'Africa/Cairo', label: 'GMT+2 (Cairo, Egypt)', offset: 2, dst: false, region: 'Africa & Middle East' },
        { value: 'Africa/Lagos', label: 'GMT+1 (Lagos, Nigeria)', offset: 1, dst: false, region: 'Africa & Middle East' },
        { value: 'Africa/Johannesburg', label: 'GMT+2 (Johannesburg, South Africa)', offset: 2, dst: false, region: 'Africa & Middle East' },
        { value: 'Africa/Nairobi', label: 'GMT+3 (Nairobi, Kenya)', offset: 3, dst: false, region: 'Africa & Middle East' },
        { value: 'Asia/Jerusalem', label: 'GMT+2/+3 (Jerusalem, Israel)', offset: 2, dst: true, region: 'Africa & Middle East' },
        { value: 'Asia/Riyadh', label: 'GMT+3 (Riyadh, Saudi Arabia)', offset: 3, dst: false, region: 'Africa & Middle East' },
        { value: 'Asia/Tehran', label: 'GMT+3:30/+4:30 (Tehran, Iran)', offset: 3.5, dst: true, region: 'Africa & Middle East' },
        
        // UTC and GMT
        { value: 'UTC', label: 'GMT+0 (UTC - Coordinated Universal Time)', offset: 0, dst: false, region: 'UTC/GMT' },
        { value: 'GMT', label: 'GMT+0 (Greenwich Mean Time)', offset: 0, dst: false, region: 'UTC/GMT' }
    ],

    // DST rules for different regions
    dstRules: {
        // US DST: Second Sunday in March to First Sunday in November
        US: {
            start: { month: 3, week: 2, day: 0 }, // March, 2nd Sunday
            end: { month: 11, week: 1, day: 0 }   // November, 1st Sunday
        },
        // Europe DST: Last Sunday in March to Last Sunday in October
        Europe: {
            start: { month: 3, week: -1, day: 0 }, // March, last Sunday
            end: { month: 10, week: -1, day: 0 }   // October, last Sunday
        },
        // Australia DST: First Sunday in October to First Sunday in April
        Australia: {
            start: { month: 10, week: 1, day: 0 }, // October, 1st Sunday
            end: { month: 4, week: 1, day: 0 }     // April, 1st Sunday
        }
    },

    // Quick access popular timezones
    popular: [
        'Asia/Manila',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney',
        'America/Los_Angeles',
        'Europe/Paris',
        'Asia/Shanghai'
    ]
};

// Helper function to get timezone by value
function getTimezoneData(value) {
    return TIMEZONE_DATA.timezones.find(tz => tz.value === value);
}

// Helper function to get timezones by region
function getTimezonesByRegion(region) {
    return TIMEZONE_DATA.timezones.filter(tz => tz.region === region);
}

// Helper function to check if DST is active
function isDSTActive(timezone, date = new Date()) {
    const tzData = getTimezoneData(timezone);
    if (!tzData || !tzData.dst) return false;
    
    // Determine DST rule based on timezone
    let dstRule;
    if (timezone.includes('America/')) {
        dstRule = TIMEZONE_DATA.dstRules.US;
    } else if (timezone.includes('Europe/')) {
        dstRule = TIMEZONE_DATA.dstRules.Europe;
    } else if (timezone.includes('Australia/')) {
        dstRule = TIMEZONE_DATA.dstRules.Australia;
    } else {
        return false;
    }
    
    const year = date.getFullYear();
    const startDate = getNthWeekdayOfMonth(year, dstRule.start.month, dstRule.start.week, dstRule.start.day);
    const endDate = getNthWeekdayOfMonth(year, dstRule.end.month, dstRule.end.week, dstRule.end.day);
    
    if (dstRule === TIMEZONE_DATA.dstRules.Australia) {
        // Southern hemisphere: DST runs from October to April (across year boundary)
        return date >= startDate || date < endDate;
    } else {
        // Northern hemisphere: DST runs within the same year
        return date >= startDate && date < endDate;
    }
}

// Helper function to get the nth weekday of a month
function getNthWeekdayOfMonth(year, month, week, weekday) {
    const firstDay = new Date(year, month - 1, 1);
    
    if (week > 0) {
        // Positive week (1st, 2nd, etc.)
        const firstWeekday = (weekday - firstDay.getDay() + 7) % 7;
        const targetDate = firstWeekday + (week - 1) * 7 + 1;
        return new Date(year, month - 1, targetDate);
    } else {
        // Negative week (last week of month)
        const lastDay = new Date(year, month, 0);
        const lastWeekday = lastDay.getDate() - (lastDay.getDay() - weekday + 7) % 7;
        return new Date(year, month - 1, lastWeekday);
    }
}

// Helper function to get current offset including DST
function getCurrentOffset(timezone, date = new Date()) {
    const tzData = getTimezoneData(timezone);
    if (!tzData) return 0;
    
    let offset = tzData.offset;
    if (isDSTActive(timezone, date)) {
        offset += 1; // Add 1 hour for DST
    }
    
    return offset;
}

// Helper function to format timezone display name
function formatTimezoneName(timezone, includeOffset = true) {
    const tzData = getTimezoneData(timezone);
    if (!tzData) return timezone;
    
    if (!includeOffset) {
        return tzData.label.split('(')[1]?.replace(')', '') || timezone;
    }
    
    return tzData.label;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TIMEZONE_DATA,
        getTimezoneData,
        getTimezonesByRegion,
        isDSTActive,
        getCurrentOffset,
        formatTimezoneName
    };
}
