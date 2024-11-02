export const getRoleName = (role) => {
    switch (role) {
        case 'student':
           return 'Student'
       case 'supervisor':
           return 'Supervisor';
        case 'faculty':
            return 'Supervisor';
        case 'hod':
            return 'HOD'
        case 'phd_coordinator':
            return 'PhD Coordinator';
        case 'dordc':
            return 'DORDC'
        case 'dra':
            return 'DRA'
        case 'external':
            return 'External Member'
        case 'doctoral':
            return 'Doctoral Committee'
        case 'complete':
            return 'Form Complete'
    }
}