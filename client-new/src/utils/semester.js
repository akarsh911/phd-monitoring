export function generateReportPeriods(next, prev, includeCurrent = true) {
    const periods = [];
    const currentDate = new Date();
    let fullYear = currentDate.getFullYear();
    let currentYear = fullYear % 100;
    const currentMonth = currentDate.getMonth() + 1;

    // Determine current semester type and academic year start
    let isEvenSemester = currentMonth <= 6;
    let academicStartYear = isEvenSemester ? currentYear - 1 : currentYear;

    let baseIndex = 0; // 0 means current semester
    if (!includeCurrent) baseIndex = isEvenSemester ? -1 : -2;

    for (let i = -prev; i <= next; i++) {
        const index = baseIndex + i;
        const semIsEven = index % 2 !== 0 ? !isEvenSemester : isEvenSemester;
        const yearOffset = Math.floor(index / 2);

        let startYear = (academicStartYear + yearOffset + 100) % 100;
        let endYear = (startYear + 1) % 100;

        periods.push(`${startYear.toString().padStart(2, '0')}${endYear.toString().padStart(2, '0')}${semIsEven ? 'EVEN' : 'ODD'}`);
    }

    return periods;
}
