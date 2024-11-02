export function generateReportPeriods(next, prev, includeCurrent = true) {
    const periods = [];
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear() % 100; // last two digits of the current year
    const currentMonth = currentDate.getMonth() + 1; // months are zero-based in JavaScript

    // Determine the starting semester based on the current month
    let isEvenSemester = currentMonth <= 6;
    let startingPoint = 0;

    // Include current semester if specified
    if (includeCurrent) {
        const nextYear = (currentYear + 1) % 100;
        periods.push(`${currentYear}${nextYear}${isEvenSemester ? 'EVEN' : 'ODD'}`);
    } else {
        // Start the loop at one period forward or backward if not including the current semester
        startingPoint = isEvenSemester ? -1 : -2;
    }

    // Generate previous semesters
    for (let i = 1; i <= prev; i++) {
        const prevPoint = startingPoint - i;
        let year = currentYear + Math.floor(prevPoint / 2);
        let nextYear = (year + 1) % 100;
        let semester = prevPoint % 2 === 0 ? 'EVEN' : 'ODD';

        periods.unshift(`${year}${nextYear}${semester}`);
    }

    // Generate next semesters
    for (let i = 1; i <= next; i++) {
        const nextPoint = startingPoint + i;
        let year = currentYear + Math.floor(nextPoint / 2);
        let nextYear = (year + 1) % 100;
        let semester = nextPoint % 2 === 0 ? 'EVEN' : 'ODD';

        periods.push(`${year}${nextYear}${semester}`);
    }

    return periods;
}